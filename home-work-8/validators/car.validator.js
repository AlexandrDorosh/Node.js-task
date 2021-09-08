const Joi = require('joi');

const { constants, userRoles } = require('../config');

const { MACHINE_NUMBER } = constants;

const createCarValidator = Joi.object({
    model: Joi.string().alphanum().min(2).max(30)
        .trim()
        .required(),
    engine: Joi.string().min(2).max(5).trim()
        .required(),
    machineNumber: Joi.string().regex(MACHINE_NUMBER).trim().required(),
    color: Joi.string().min(2).max(30),
    price: Joi.string().min(2).max(10),
    role: Joi.string().allow(...Object.values(userRoles)),
});

const updateCar = Joi.object({
    engine: Joi.string().min(2).max(5).trim(),
    machineNumber: Joi.string().regex(MACHINE_NUMBER).trim(),
    color: Joi.string().min(2).max(30),
});

module.exports = {
    createCarValidator,
    updateCar
};
