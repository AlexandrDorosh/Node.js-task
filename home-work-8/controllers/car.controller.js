const { carService } = require('../services');
const { statusCodes, messages } = require('../config');

const {
    CREATED, SUCCESS, ACCEPTED, DELETED
} = statusCodes;

const { DELETED_MESS, UPDATED_MESS } = messages;

const {
    getAllCars, createCar, updateCar, deleteCar
} = carService;

const { carUtil } = require('../utils');

const { carNormalizator } = carUtil;

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
            res.status(SUCCESS).json(carToReturn);
        } catch (e) {
            next(e);
        }
    },

    getSingleCar: (req, res, next) => {
        try {
            const carToReturn = carNormalizator(req.car);
            res.status(SUCCESS).json(carToReturn);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            await deleteCar(car_id);
            res.status(DELETED).json(DELETED_MESS);
        } catch (e) {
            next(e);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            await updateCar(car_id, req.body);
            res.status(ACCEPTED).json(UPDATED_MESS);
        } catch (e) {
            next(e);
        }
    },
};
