const router = require('express').Router();

const { carController } = require('../controllers');
const { carMiddleware } = require('../middlewares');

const {
    validateCarBodyCreate,
    validateCarBodyUpdate,
    getCarByDinamicParam,
    checkCarRoleMiddleware
} = carMiddleware;

router.post('/', validateCarBodyCreate, carController.createCar);

router.get('/', carController.getAllCars);

router.get('/:car_id', getCarByDinamicParam('car_id', 'params', '_id'), carController.getSingleCar);

router.delete('/:car_id',
    getCarByDinamicParam('car_id', 'params', '_id'),
    checkCarRoleMiddleware(['admin']),
    carController.deleteCar);

router.put('/:car_id', validateCarBodyUpdate, getCarByDinamicParam('car_id', 'params', '_id'), carController.updateCar);

module.exports = router;
