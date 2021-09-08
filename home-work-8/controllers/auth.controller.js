const { passwordService, jwtService, emailService } = require('../services');
const { userNormalizator } = require('../utils/user.util');
const { OAuth } = require('../dataBase');
const { constants, emailActionEnum } = require('../config');
const { statusCodes } = require('../config');

const { AUTHORIZATION } = constants;

module.exports = {
    authUser: async (req, res, next) => {
        try {
            const { user, body } = req;
            const { name, email } = body;

            await passwordService.compare(body.password, user.password);

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.create({ ...tokenPair, user: user._id });

            await emailService.sendMail(
                email,
                emailActionEnum.WELCOME,
                { userName: name }
            );

            res.json({
                ...tokenPair,
                user: userNormalizator(user)
            });
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            await OAuth.deleteOne({ access_token });

            res.sendStatus(statusCodes.DELETED);
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);
            const user = req.authUser;

            await OAuth.deleteOne({ refresh_token });

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.create({ ...tokenPair, user: user._id });

            res.json({
                ...tokenPair,
                user: userNormalizator(user)
            });
        } catch (e) {
            next(e);
        }
    }
};
