import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import authConfig from '../config/auth.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../model/user.entity';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt.guard';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        ConfigModule.forFeature(authConfig),
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                signOptions: { expiresIn: '60s' },
                secret: configService.get<string>('auth.secret') || 'secret',
            }),
        }),
        forwardRef(() => UsersModule),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        RefreshTokenStrategy,
        {
            provide: APP_GUARD,
            useClass: LocalAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RefreshJwtGuard,
        },
    ],
    exports: [AuthService],
})
export class AuthModule {}
