const Joi = require('joi');

const { constants } = require('../config');

const { PASSWORD_REGEXP, EMAIL_REGEXP } = constants;

const createUserAuthValidator = Joi.object({
    email: Joi.string().regex(EMAIL_REGEXP).trim().required(),
    password: Joi.string().regex(PASSWORD_REGEXP).trim().required(),
});

module.exports = createUserAuthValidator;
