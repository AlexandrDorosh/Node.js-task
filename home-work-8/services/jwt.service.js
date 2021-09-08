const jwt = require('jsonwebtoken');
const util = require('util');

const verifyPromise = util.promisify(jwt.verify);

const { variables, statusCodes, messages } = require('../config');
const { ErrorHandler } = require('../errors');

const { UNAUTHORIZATED } = statusCodes;
const { INVALID_TOKEN } = messages;

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = variables;

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, ACCESS_SECRET_KEY, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, REFRESH_SECRET_KEY, { expiresIn: '31d' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = 'access') => {
        try {
            const secret = tokenType === 'access' ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;

            await verifyPromise(token, secret);
        } catch (e) {
            throw new ErrorHandler(UNAUTHORIZATED, INVALID_TOKEN);
        }
    }
};
