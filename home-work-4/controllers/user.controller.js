const { userService } = require('../services');

const {
    getAllUsers, createUser, deleteUser, updateUser
} = userService;

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const createdUser = await createUser(req.body);
            res.json(createdUser);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const users = await getAllUsers();
            res.json(users);
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

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            await deleteUser(user_id);
            res.json(`User with id: ${user_id} was deleted`);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            await updateUser(user_id, req.body);
            res.json(`User with id: ${user_id} was updated`);
        } catch (e) {
            next(e);
        }
    },
};
