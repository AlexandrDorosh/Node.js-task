const { carService: { getAllCars, createCar, updateCar, deleteCar } } = require('../services');
const { statusCodes: { CREATED, DELETED }, messages: { UPDATED_MESS } } = require('../config');
const { carUtil: { carNormalizator } } = require('../utils');

module.exports = {
    createCar: async (req, res, next) => {
        try {
            const createdCar = await createCar(req.body);
            const carToReturn = carNormalizator(createdCar);

            res.status(CREATED).json(carToReturn);
        } catch (e) {
            next(e);
        }
    },

    getAllCars: async (req, res, next) => {
        try {
            const cars = await getAllCars();
            const carToReturn = cars.map((car) => carNormalizator(car));

            res.json(carToReturn);
        } catch (e) {
            next(e);
        }
    },

    getSingleCar: (req, res, next) => {
        try {
            const carToReturn = carNormalizator(req.car);
            res.json(carToReturn);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            await deleteCar(car_id);

            res.sendStatus(DELETED);
        } catch (e) {
            next(e);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            await updateCar(car_id, req.body);
            res.status(CREATED).json(UPDATED_MESS);
        } catch (e) {
            next(e);
        }
    },
};
