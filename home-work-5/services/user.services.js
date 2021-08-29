const User = require('../dataBase/User');

module.exports = {
    createUser: (user) => User.create(user),

    getAllUsers: () => User.find(),

    deleteUser: (user_id) => User.deleteOne({ _id: user_id }),

    updateUser: (user_id, body) => User.findByIdAndUpdate({ _id: user_id }, body)
};
