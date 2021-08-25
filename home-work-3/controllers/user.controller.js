const path = require('path');
const userService = require('../services/user.services');

const usersDb = path.join(process.cwd(), 'dataBase', 'users.json');
const { authUserRead, authUserWrite } = userService;

module.exports = {
    createUser: async (req, res) => {
        const { login } = req.body;
        const usersData = await authUserRead(usersDb);
        const dataStr = usersData.toString();
        const arr = dataStr ? usersData : [];

        const findRegUser = arr.find((user) => user.login === login);
        if (findRegUser) {
            return res.status(404).end('Sorry, but you are already registered');
        }
        arr.push(req.body);

        await authUserWrite(usersDb, arr);
        return res.redirect('/auth');
    },

    getSingleUser: async (req, res) => {
        const { user_id } = req.params;
        const usersData = await authUserRead(usersDb);
        const currentUser = usersData[user_id];
        if (!currentUser) {
            res.status(404).end('NOT FOUND');
            return;
        }
        res.json(currentUser);
    },

    getAllUsers: async (req, res) => {
        const users = await authUserRead(usersDb);
        res.render('users', { users });
    }
};
