const bcrypt = require('bcrypt');
const { ErrorHandler } = require('../errors');
const { BAD_REQUEST } = require('../config/statusCodes');
const { EMAIL_OR_PASS_IS_WRONG } = require('../config/messages');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hash) => {
        const isPasswordMatched = await bcrypt.compare(password, hash);

        if (!isPasswordMatched) {
            throw new ErrorHandler(BAD_REQUEST, EMAIL_OR_PASS_IS_WRONG);
        }
    }
};
