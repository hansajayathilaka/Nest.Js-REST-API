import { registerAs } from '@nestjs/config';

export default registerAs('typeorm', () => ({
    type: 'postgres',
    host: `${process.env.DATABASE_HOST}`,
    port: `${process.env.DATABASE_PORT}`,
    username: `${process.env.DATABASE_USER}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: process.env.RUN_MIGRATIONS === 'true',
}));
