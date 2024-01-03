import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../model/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async login(loginUserDto: LoginDto) {
        const user = await this.userRepository.findOne({
            where: { email: loginUserDto.email },
            select: ['id', 'email', 'passwordHash'],
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        const isMatch = await this.comparePassword(
            loginUserDto.password,
            user.passwordHash,
        );

        if (!isMatch) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, email: user.email };
        const accessToken = await this.jwtService.signAsync(payload);

        return { access_token: accessToken };
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
