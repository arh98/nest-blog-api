import * as Joi from 'joi';

export default Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
    DB_PORT: Joi.number().port().default(5432),
    DB_PASSWD: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_USER: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_CONFIRM_EMAIL_SECRET: Joi.string().required(),
    JWT_RESET_PASSWORD_SECRET: Joi.string().required(),
    JWT_AUDIENCE: Joi.string().required(),
    JWT_ISSUER: Joi.string().required(),
    JWT_EXP: Joi.number().required(),
    JWT_REFRESH_EXP: Joi.number().required(),
    API_VERSION: Joi.string().required(),
    MAIL_HOST: Joi.string().required(),
    MAIL_PORT: Joi.number().required(),
    MAIL_USER: Joi.string().required(),
    MAIL_PASSWORD: Joi.string().required(),
    LIARA_API_ENPOINT: Joi.string().required(),
    LIARA_BUCKET_NAME: Joi.string().required(),
    LIARA_ACC_KEY: Joi.string().required(),
    LIARA_SECRET_KEY: Joi.string().required(),
});
