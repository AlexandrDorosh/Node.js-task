const Car = require('../dataBase/Car');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    isCarPresent: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const car = await Car.findById(car_id);
            if (!car) {
                throw new ErrorHandler(418, 'car not found');
            }
            req.car = car;
            req.testParam = 'Hello';
            next();
        } catch (e) {
            next(e);
        }
    }
};
