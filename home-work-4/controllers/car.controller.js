const { carService } = require('../services');

const {
    getAllCars, createCar, updateCar, deleteCar
} = carService;

module.exports = {
    createCar: async (req, res, next) => {
        try {
            const createdCar = await createCar(req.body);
            res.json(createdCar);
        } catch (e) {
            next(e);
        }
    },

    getAllCars: async (req, res, next) => {
        try {
            const cars = await getAllCars();
            res.json(cars);
        } catch (e) {
            next(e);
        }
    },

    getSingleCar: (req, res, next) => {
        try {
            res.json(req.car);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            await deleteCar(car_id);
            res.json(`Car with id: ${car_id} was deleted`);
        } catch (e) {
            next(e);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            await updateCar(car_id, req.body);
            res.json(`Car with id: ${car_id} was updated`);
        } catch (e) {
            next(e);
        }
    },
};
