import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const config = {
    secret: `${process.env.JWT_SECRET}`,
    expiresIn: `${process.env.JWT_EXPIRES_IN}`,
    refreshTokenExpiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRES_IN}`,
};

export default registerAs('auth', () => config);
