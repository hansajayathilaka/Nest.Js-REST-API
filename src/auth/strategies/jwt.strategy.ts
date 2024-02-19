import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import authConfig from '../../config/auth.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        @Inject(authConfig.KEY)
        private readonly authConfigService: ConfigType<typeof authConfig>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: authConfigService.secret,
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub.userId, email: payload.email };
    }
}
