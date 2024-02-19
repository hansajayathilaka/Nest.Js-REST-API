import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import { WinstonLogger } from './logger/winston.logger';

async function bootstrap() {
    const winstonLogger = new WinstonLogger();
    const app = await NestFactory.create(AppModule, {
        logger: WinstonModule.createLogger(winstonLogger.createLoggerConfig),
    });

    // Swagger
    const config = new DocumentBuilder()
        .setTitle('Simple API')
        .setDescription('The simple API description')
        .setVersion('1.0')
        .addTag('Simple API')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    // Security
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );
    app.use(helmet({}));
    app.enableCors();

    await app.listen(3000);
}
bootstrap();
