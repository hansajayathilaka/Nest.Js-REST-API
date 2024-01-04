import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import auth from '../config/auth.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../model/user.entity';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersService } from '../users/users.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        ConfigModule.forRoot({
            isGlobal: false,
            load: [auth],
        }),
        JwtModule.registerAsync({
            global: true,
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                signOptions: { expiresIn: '60s' },
                secret: configService.get('auth.secret'),
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        RefreshTokenStrategy,
        UsersService,
    ],
    exports: [AuthService],
})
export class AuthModule {}
