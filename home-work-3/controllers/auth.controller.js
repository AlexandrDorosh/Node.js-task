const path = require('path');
const userService = require('../services/user.services');

const usersDb = path.join(process.cwd(), 'dataBase', 'users.json');
const { authUserRead } = userService;

module.exports = {
    loginUser: async (req, res) => {
        const { login, password } = req.body;
        const usersData = await authUserRead(usersDb);
        console.log(usersData);
        const findUser = usersData.find((user) => user.login === login && user.password === password);
        if (findUser) {
            return res.render('hello', { findUser });
        }
        return res.redirect('/registration');
    },

    registrationUser: (req, res) => {
        res.render('auth');
    }
};
