const { ErrorHandler } = require('../errors');
const { messages, statusCodes, constants } = require('../config');
const { authValidator } = require('../validators');
const { User, OAuth } = require('../dataBase');
const { jwtService: { verifyToken } } = require('../services');

const { REFRESH, USER } = constants;
const { EMAIL_OR_PASS_IS_WRONG, NO_TOKEN, INVALID_TOKEN } = messages;
const { NOT_FOUND, UNAUTHORIZATED } = statusCodes;

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
    },

    validateAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(constants.AUTHORIZATION);

            if (!access_token) {
                throw new ErrorHandler(UNAUTHORIZATED, NO_TOKEN);
            }

            await verifyToken(access_token);

            const tokenFromDB = await OAuth.findOne({ access_token }).populate(USER);

            if (!tokenFromDB) {
                throw new ErrorHandler(UNAUTHORIZATED, INVALID_TOKEN);
            }

            req.authUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(constants.AUTHORIZATION);

            if (!refresh_token) {
                throw new ErrorHandler(UNAUTHORIZATED, NO_TOKEN);
            }

            await verifyToken(refresh_token, REFRESH);

            const tokenFromDB = await OAuth.findOne({ refresh_token }).populate(USER);

            if (!tokenFromDB) {
                throw new ErrorHandler(UNAUTHORIZATED, INVALID_TOKEN);
            }

            req.authUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
