const router = require('express').Router();

const { carController } = require('../controllers');
const { carMiddleware } = require('../middlewares');
const { CAR_ID, PARAMS, _ID } = require('../config/constants');

const {
    validateCarBodyCreate,
    validateCarBodyUpdate,
    getCarByDinamicParam,
    checkCarRoleMiddleware
} = carMiddleware;

router.post('/', validateCarBodyCreate, carController.createCar);

router.get('/', carController.getAllCars);

router.get('/:car_id', getCarByDinamicParam(CAR_ID, PARAMS, _ID), carController.getSingleCar);

router.delete('/:car_id',
    getCarByDinamicParam(CAR_ID, PARAMS, _ID),
    checkCarRoleMiddleware(['admin']),
    carController.deleteCar);

router.put('/:car_id', validateCarBodyUpdate, getCarByDinamicParam(CAR_ID, PARAMS, _ID), carController.updateCar);

module.exports = router;
