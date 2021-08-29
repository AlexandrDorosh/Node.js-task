const { userService } = require('../services');
const { statusCodes, messages } = require('../config');
const User = require('../dataBase/User');

const {
    CREATED, SUCCESS, ACCEPTED, DELETED
} = statusCodes;

const { DELETED_MESS, UPDATED_MESS } = messages;

const {
    getAllUsers, deleteUser, updateUser
} = userService;

const { passwordService } = require('../service');
const { userNormalizator } = require('../utils/user.util');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashedPassword = await passwordService.hash(password);

            const createdUser = await User.create({ ...req.body, password: hashedPassword });

            const userToReturn = userNormalizator(createdUser);

            res.status(CREATED).json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const users = await getAllUsers();

            const userToReturn = users.map((user) => userNormalizator(user));

            res.status(SUCCESS).json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    getSingleUser: (req, res, next) => {
        try {
            const userToReturn = userNormalizator(req.user);
            res.status(SUCCESS).json(userToReturn);
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
