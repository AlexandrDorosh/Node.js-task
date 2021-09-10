const Joi = require('joi');

const { constants } = require('../config');

const { PASSWORD_REGEXP, EMAIL_REGEXP } = constants;

const passwordSchema = Joi.string().regex(PASSWORD_REGEXP).trim().required();

const createUserAuthValidator = Joi.object({
    email: Joi.string().regex(EMAIL_REGEXP).trim().required(),
    password: passwordSchema
});

const passwordValidator = Joi.object({
    password: passwordSchema
});

module.exports = {
    createUserAuthValidator,
    passwordValidator
};
