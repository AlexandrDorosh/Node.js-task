const { Car } = require('../dataBase');
const { ErrorHandler } = require('../errors');
const { messages: { CAR_NOT_FOUND }, statusCodes: { NOT_FOUND, FORBIDDEN } } = require('../config');
const { carValidator: { createCarValidator, updateCar } } = require('../validators');
const { FORBIDDEN_MESS } = require('../config/messages');

module.exports = {
    validateCarBodyCreate: (req, res, next) => {
        try {
            const { error } = createCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(NOT_FOUND, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateCarBodyUpdate: (req, res, next) => {
        try {
            const { error } = updateCar.validate(req.body);

            if (error) {
                throw new ErrorHandler(NOT_FOUND, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkCarRoleMiddleware: (rolesArr = []) => (req, res, next) => {
        try {
            const { role } = req.user;

            if (!role.length) {
                return next();
            }

            if (!rolesArr.includes(role)) {
                throw new ErrorHandler(FORBIDDEN, FORBIDDEN_MESS);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    getCarByDinamicParam: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const car = await Car.findOne({ [dbField]: value });

            if (!car) {
                throw new ErrorHandler(NOT_FOUND, CAR_NOT_FOUND);
            }

            req.car = car;
            next();
        } catch (e) {
            next(e);
        }
    }
};
