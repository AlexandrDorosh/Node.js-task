const path = require('path');
const userService = require('../services/user.services');
const ErrorHandler = require('../errors/ErrorHandler');

const User = require('../dataBases/User');

const usersDb = path.join(process.cwd(), 'dataBase', 'users.json');

const { authUserRead } = userService;

module.exports = {
    createUser: async (req, res, next) => {
        // const { login } = req.body;
        // const usersData = await authUserRead(usersDb);
        // const dataStr = usersData.toString();
        // const arr = dataStr ? usersData : [];
        //
        // const findRegUser = arr.find((user) => user.login === login);
        // if (findRegUser) {
        //     return res.status(404).end('Sorry, but you are already registered');
        // }
        // arr.push(req.body);
        //
        // await authUserWrite(usersDb, arr);
        // return res.redirect('/auth');
        try {
            const createdUser = await User.create(req.body);
            res.json(createdUser);
        } catch (e) {
            next(e);
        }
    },

    getSingleUser: (req, res, next) => {
        try {
            // const { user, testParam } = req;
            // console.log(user);
            // console.log(testParam);
            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res) => {
        const users = await authUserRead(usersDb);
        res.render('users', { users });
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            await User.deleteOne({ _id: user_id });
            res.status(204).json(`User with id: ${user_id} was deleted`);
        } catch (e) {
            next(e);
        }
    },
};
