const { User } = require('../dataBase');
const { ErrorHandler } = require('../errors');

const { messages, statusCodes } = require('../config');

const { NOT_FOUND } = statusCodes;
const { USER_NOT_FOUND, EMAIL_EXISTS } = messages;
const { userValidator } = require('../validators');
const { FORBIDDEN } = require('../config/statusCodes');
const { FORBIDDEN_MESS } = require('../config/messages');

const { createUserValidator, updateUser } = userValidator;

module.exports = {
    checkUniqueEmail: async (req, res, next) => {
        try {
            const { email } = req.body;
            const userByEmail = await User.findOne({ email });

            if (userByEmail) {
                throw new ErrorHandler(NOT_FOUND, EMAIL_EXISTS);
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
            const { role } = req.user;

            if (!role.length) {
                return next();
            }

            if (!rolesArr.includes(role)) {
                throw new ErrorHandler(FORBIDDEN, FORBIDDEN_MESS);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    getUserByDinamicParam: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const user = await User.findOne({ [dbField]: value });

            if (!user) {
                throw new ErrorHandler(NOT_FOUND, USER_NOT_FOUND);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }
};
