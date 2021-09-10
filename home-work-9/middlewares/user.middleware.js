const { User } = require('../dataBase');
const { ErrorHandler } = require('../errors');

const { messages, statusCodes } = require('../config');

const { NOT_FOUND, FORBIDDEN, EXISTS } = statusCodes;
const { USER_NOT_FOUND, FORBIDDEN_MESS, USER_EXISTS } = messages;
const { userValidator } = require('../validators');

const { createUserValidator, updateUser } = userValidator;

module.exports = {
    isUserNotPresent: (req, res, next) => {
        try {
            const { user } = req;

            if (!user) {
                throw new ErrorHandler(NOT_FOUND, USER_NOT_FOUND);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: (req, res, next) => {
        try {
            const { user } = req;

            if (user) {
                throw new ErrorHandler(EXISTS, USER_EXISTS);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateUserBody: (req, res, next) => {
        try {
            const { error } = createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(NOT_FOUND, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateUserBodyUpdate: (req, res, next) => {
        try {
            const { error } = updateUser.validate(req.body);

            if (error) {
                throw new ErrorHandler(NOT_FOUND, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRoleMiddleware: (rolesArr = []) => (req, res, next) => {
        try {
            const { authUser: { role, _id }, params: { user_id } } = req;

            if (user_id === _id.toString()) {
                return next();
            }

            if (!role.length) {
                return next();
            }

            if (rolesArr.includes(role)) {
                return next();
            }

            throw new ErrorHandler(FORBIDDEN, FORBIDDEN_MESS);
        } catch (e) {
            next(e);
        }
    },

    getUserByDinamicParam: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const user = await User.findOne({ [dbField]: value });

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    ifUserAccess: (req, res, next) => {
        try {
            const { authUser, user } = req;

            if (user._id.toString() !== authUser._id.toString()) {
                throw ErrorHandler(FORBIDDEN, FORBIDDEN_MESS);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
