const Car = require('../dataBase/Car');

module.exports = {
    findUser: (email) => Car.findOne(email),
};
