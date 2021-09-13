const { ErrorHandler } = require('../errors');
const {
    messages: { EMAIL_OR_PASS_IS_WRONG, NO_TOKEN, INVALID_TOKEN },
    statusCodes: { NOT_FOUND, UNAUTHORIZATED },
    constants: { REFRESH, AUTHORIZATION }
} = require('../config');
const { authValidator: { createUserAuthValidator } } = require('../validators');
const { User, OAuth, ActionTokens } = require('../dataBase');
const { jwtService: { verifyToken, verifyActionToken } } = require('../services');

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
            const { error } = createUserAuthValidator.validate(req.body);

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
            const access_token = req.get(AUTHORIZATION);

            if (!access_token) {
                throw new ErrorHandler(UNAUTHORIZATED, NO_TOKEN);
            }

            await verifyToken(access_token);

            const tokenFromDB = await OAuth.findOne({ access_token });

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
            const refresh_token = req.get(AUTHORIZATION);

            if (!refresh_token) {
                throw new ErrorHandler(UNAUTHORIZATED, NO_TOKEN);
            }

            await verifyToken(refresh_token, REFRESH);

            const tokenFromDB = await OAuth.findOne({ refresh_token });

            if (!tokenFromDB) {
                throw new ErrorHandler(UNAUTHORIZATED, INVALID_TOKEN);
            }

            req.authUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateActionToken: (tokenType) => async (req, res, next) => {
        try {
            const actionToken = req.get(AUTHORIZATION);

            if (!actionToken) {
                throw new ErrorHandler(UNAUTHORIZATED, NO_TOKEN);
            }

            await verifyActionToken(actionToken, tokenType);

            const tokenFromDB = await ActionTokens.findOne({ token: actionToken });

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
