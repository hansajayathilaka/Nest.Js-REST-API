import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../model/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import { TokenResponseDto } from './dto/token-response.dto';
import authConfig from '../config/auth.config';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService,

        @Inject(authConfig.KEY)
        private readonly authConfigService: ConfigType<typeof authConfig>,
    ) {}

    async login(user: User): Promise<User & TokenResponseDto> {
        const payload = { sub: { userId: user.id }, email: user.email };
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: this.authConfigService.expiresIn,
        });

        user.passwordHash = undefined;
        return {
            ...user,
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }

    async refresh(user: User): Promise<TokenResponseDto> {
        const payload = { sub: { userId: user.id }, email: user.email };
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: this.authConfigService.refreshTokenExpiresIn,
        });

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { email },
            select: ['id', 'email', 'passwordHash'],
        });

        if (!user) return null;

        const isMatch = await this.comparePassword(password, user.passwordHash);

        if (!isMatch) return null;

        user.passwordHash = undefined;
        return user;
    }

    async hashPassword(password: string) {
        const saltOrRounds = 10;
        // const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash;
    }

    private async comparePassword(password: string, passwordHash: string) {
        const isMatch = await bcrypt.compare(password, passwordHash);
        return isMatch;
    }
}
