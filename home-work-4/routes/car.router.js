const router = require('express').Router();

const { carController } = require('../controllers');
const { carMiddleware } = require('../middlewares');

const { isCarPresent } = carMiddleware;

router.post('/', carController.createCar);

router.get('/', carController.getAllCars);

router.get('/:car_id', isCarPresent, carController.getSingleCar);

router.delete('/:car_id', isCarPresent, carController.deleteCar);

router.put('/:car_id', isCarPresent, carController.updateCar);

module.exports = router;
