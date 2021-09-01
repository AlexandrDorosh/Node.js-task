const Joi = require('joi');

const { constants, userRoles } = require('../config');

const { CURRENT_YEAR, PASSWORD_REGEXP, EMAIL_REGEXP } = constants;

const girlValidator = Joi.object({
    name: Joi.string(),
    age: Joi.number().min(15).max(60)
});

const createUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(30)
        .trim()
        .required(),
    password: Joi.string().regex(PASSWORD_REGEXP).trim().required(),
    email: Joi.string().regex(EMAIL_REGEXP).trim().required(),
    born_year: Joi.number().min(CURRENT_YEAR - 120).max(CURRENT_YEAR - 6),
    role: Joi.string().allow(...Object.values(userRoles)),

    car: Joi.boolean(),

    girls: Joi.array()
        .items(girlValidator)
        .when('car', { is: true, then: Joi.required() })
});

const updateUser = Joi.object({
    name: Joi.string().alphanum().min(2).max(30)
        .trim(),
    email: Joi.string().regex(EMAIL_REGEXP).trim().required(),
});

module.exports = {
    createUserValidator,
    updateUser
};
