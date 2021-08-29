const Car = require('../dataBase/Car');
const ErrorHandler = require('../errors/ErrorHandler');

const { messages, statusCodes } = require('../config');

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
    }
};
