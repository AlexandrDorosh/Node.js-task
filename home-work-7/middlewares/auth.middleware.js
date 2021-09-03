const { ErrorHandler } = require('../errors');

const { messages, statusCodes } = require('../config');

const { NOT_FOUND } = statusCodes;
const { EMAIL_OR_PASS_IS_WRONG } = messages;

const { authValidator } = require('../validators');
const { User } = require('../dataBase');

module.exports = {
    getAuthByDinamicParam: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const user = await User.findOne({ [dbField]: value });

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
