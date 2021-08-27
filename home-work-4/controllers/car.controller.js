const { carService } = require('../services');
const {
    CREATED, SUCCESS, ACCEPTED, DELETED
} = require('../config/statusCodes');

const { DELETED_MESS, UPDATED_MESS } = require('../config/messages');

const {
    getAllCars, createCar, updateCar, deleteCar
} = carService;

module.exports = {
    createCar: async (req, res, next) => {
        try {
            const createdCar = await createCar(req.body);
            res.status(CREATED).json(createdCar);
        } catch (e) {
            next(e);
        }
    },

    getAllCars: async (req, res, next) => {
        try {
            const cars = await getAllCars();
            res.status(SUCCESS).json(cars);
        } catch (e) {
            next(e);
        }
    },

    getSingleCar: (req, res, next) => {
        try {
            res.status(SUCCESS).json(req.car);
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
