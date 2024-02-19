import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('auth.secret'),
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub.userId, email: payload.email };
    }
}
