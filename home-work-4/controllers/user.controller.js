const { userService } = require('../services');

const {
    CREATED, SUCCESS, ACCEPTED, DELETED
} = require('../config/statusCodes');

const { DELETED_MESS, UPDATED_MESS } = require('../config/messages');

const {
    getAllUsers, createUser, deleteUser, updateUser
} = userService;

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const createdUser = await createUser(req.body);
            res.status(CREATED).json(createdUser);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const users = await getAllUsers();
            res.status(SUCCESS).json(users);
        } catch (e) {
            next(e);
        }
    },

    getSingleUser: (req, res, next) => {
        try {
            res.status(SUCCESS).json(req.user);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            await deleteUser(user_id);
            res.status(DELETED).json(DELETED_MESS);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            await updateUser(user_id, req.body);
            res.status(ACCEPTED).json(UPDATED_MESS);
        } catch (e) {
            next(e);
        }
    },
};
