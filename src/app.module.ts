import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StocksModule } from './stocks/stocks.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import typeormConfig from './config/typeorm.config';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
    imports: [
        ConfigModule.forRoot({ load: [typeormConfig] }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) =>
                configService.get('typeorm'),
        }),
        ProductsModule,
        StocksModule,
        UsersModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes({
            path: '*',
            method: RequestMethod.ALL,
        });
    }
}
