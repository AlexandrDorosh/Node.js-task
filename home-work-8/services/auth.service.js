const { Car } = require('../dataBase');

module.exports = {
    findUser: (email) => Car.findOne(email),
};
