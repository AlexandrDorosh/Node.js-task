const User = require('../dataBase/User');
const ErrorHandler = require('../errors/ErrorHandler');

const { NOT_FOUND } = require('../config/statusCodes');
const { USER_NOT_FOUND, EMAIL_EXISTS } = require('../config/messages');

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const user = await User.findById(user_id);

            if (!user) {
                throw new ErrorHandler(NOT_FOUND, USER_NOT_FOUND);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

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
    }
};
