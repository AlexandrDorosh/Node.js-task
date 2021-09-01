const ErrorHandler = require('../errors/ErrorHandler');

const { messages, statusCodes } = require('../config');

const { NOT_FOUND } = statusCodes;
const { EMAIL_OR_PASS_IS_WRONG } = messages;

const { findUser } = require('../services/auth.service');
const { authValidator } = require('../validators');

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const { email } = req.params;
            const user = await findUser(email);

            if (!user) {
                throw new ErrorHandler(NOT_FOUND, EMAIL_OR_PASS_IS_WRONG);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    validateUserBody: (req, res, next) => {
        try {
            const { error } = authValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(NOT_FOUND, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
