const jwt = require('jsonwebtoken');
const util = require('util');

const verifyPromise = util.promisify(jwt.verify);

const {
    actionTokensEnum: { FORGOT_PASS },
    variables: { ACCESS_SECRET_KEY, FORGOT_PASSWORD_SECRET_KEY, REFRESH_SECRET_KEY },
    statusCodes: { INTERNAL_SERVER_ERROR, UNAUTHORIZATED },
    messages: { INVALID_TOKEN, WRONG_TOKEN_TYPE }
} = require('../config');
const { ErrorHandler } = require('../errors');

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
    },

    generateActionToken: (actionType) => {
        const secretWord = _getSecretWordForActionToken(actionType);

        return jwt.sign({}, secretWord, { expiresIn: '7d' });
    },

    verifyActionToken: (token, actionType) => {
        const secretWord = _getSecretWordForActionToken(actionType);

        return jwt.verify(token, secretWord);
    }
};

function _getSecretWordForActionToken(actionType) {
    let secretWord = '';

    switch (actionType) {
        case FORGOT_PASS:
            secretWord = FORGOT_PASSWORD_SECRET_KEY;
            break;
        case 'x2':
            secretWord = 'dsadsa';
            break;
        default:
            throw new ErrorHandler(INTERNAL_SERVER_ERROR, WRONG_TOKEN_TYPE);
    }

    return secretWord;
}
