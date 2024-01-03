import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: './src/.env' });

const config = {
    secret: process.env.JWT_SECRET,
};

export default registerAs('auth', () => config);
