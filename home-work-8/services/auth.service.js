const { User } = require('../dataBase');

module.exports = {
    findUser: (filter) => User.findOne(filter),
};
