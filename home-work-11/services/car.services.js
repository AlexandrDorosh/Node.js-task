const { Car } = require('../dataBase');

module.exports = {
    createCar: (car) => Car.create(car),

    getAllCars: () => Car.find(),

    deleteCar: (car_id) => Car.deleteOne({ _id: car_id }),

    updateCar: (car_id, body) => Car.findByIdAndUpdate({ _id: car_id }, body)
};
