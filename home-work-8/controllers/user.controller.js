const { userService } = require('../services');
const { statusCodes, messages, emailActionEnum } = require('../config');
const { User } = require('../dataBase');

const {
    CREATED, SUCCESS, ACCEPTED, DELETED
} = statusCodes;

const { DELETED_MESS, UPDATED_MESS } = messages;

const {
    getAllUsers, deleteUser, updateUser
} = userService;

const { passwordService, emailService } = require('../services');
const { userUtil } = require('../utils');

const { userNormalizator } = userUtil;

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashedPassword = await passwordService.hash(password);

            const createdUser = await User.create({ ...req.body, password: hashedPassword });

            const userToReturn = userNormalizator(createdUser);

            await emailService.sendMail(
                'dovgaloleksandr388@gmail.com',
                emailActionEnum.CREATE,
                { userName: req.user.name }
            );

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

    getSingleUser: async (req, res, next) => {
        try {
            const userToReturn = userNormalizator(req.user);

            await emailService.sendMail(
                'dovgaloleksandr388@gmail.com',
                emailActionEnum.WELCOME,
                { userName: req.user.name }
            );

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
