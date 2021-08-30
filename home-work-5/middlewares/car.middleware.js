const Car = require('../dataBase/Car');
const ErrorHandler = require('../errors/ErrorHandler');

const { messages, statusCodes } = require('../config');
const { carValidator } = require('../validators');
const { createCarValidator, updateCar } = carValidator;

const { NOT_FOUND } = statusCodes;
const { CAR_NOT_FOUND } = messages;

module.exports = {
    isCarPresent: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const car = await Car.findById(car_id);

            if (!car) {
                throw new ErrorHandler(NOT_FOUND, CAR_NOT_FOUND);
            }

            req.car = car;
            next();
        } catch (e) {
            next(e);
        }
    },

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
    }
};
