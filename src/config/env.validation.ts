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
    // PROFILE_API_KEY: Joi.string().required(),
});
