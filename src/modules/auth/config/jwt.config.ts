import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
    return {
        secret: process.env.JWT_SECRET,
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER,
        accessTokenTtl: parseInt(process.env.JWT_EXP ?? '3600', 10),
        refreshTokenTtl: parseInt(process.env.JWT_REFRESH_EXP ?? '86400', 10),
        confirmEmailSecret: process.env.JWT_CONFIRM_EMAIL_SECRET,
        resetPasswordSecret: process.env.JWT_RESET_PASSWORD_SECRET,
    };
});
