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
const { userRoles } = require('../config');

const { userNormalizator } = userUtil;

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { password, name, email } = req.body;

            const hashedPassword = await passwordService.hash(password);

            const createdUser = await User.create({ ...req.body, password: hashedPassword });

            const userToReturn = userNormalizator(createdUser);

            await emailService.sendMail(
                email,
                emailActionEnum.WELCOME,
                { userName: name }
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
            const { name, email } = req.body;

            await emailService.sendMail(
                email,
                emailActionEnum.WELCOME,
                { userName: name }
            );

            res.status(SUCCESS).json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const { name, email, role } = req.body;
            await deleteUser(user_id);

            if (role === userRoles.ADMIN) {
                await emailService.sendMail(
                    email,
                    emailActionEnum.DELETE_ADMIN,
                    { userName: name }
                );
            } else {
                await emailService.sendMail(
                    email,
                    emailActionEnum.DELETE,
                    { userName: name }
                );
            }

            res.status(DELETED).json(DELETED_MESS);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const { name, email } = req.body;
            await updateUser(user_id, req.body);

            await emailService.sendMail(
                email,
                emailActionEnum.UPDATE,
                { userName: name }
            );

            res.status(ACCEPTED).json(UPDATED_MESS);
        } catch (e) {
            next(e);
        }
    },
};
