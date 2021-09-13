const { passwordService, jwtService, emailService } = require('../services');
const { userNormalizator } = require('../utils/user.util');
const { ActionTokens, OAuth, User } = require('../dataBase');
const {
    constants: { AUTHORIZATION },
    emailActionEnum,
    actionTokensEnum: { FORGOT_PASS },
    statusCodes, variables
} = require('../config');

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
                emailActionEnum.AUTH,
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
    },

    sendEmailForgotPassword: async (req, res, next) => {
        try {
            const { user, body } = req;
            const { name, email } = body;

            const actionToken = jwtService.generateActionToken(FORGOT_PASS);

            await ActionTokens.create({ token: actionToken, user: user._id });

            await emailService.sendMail(email,
                emailActionEnum.FORGOT_PASSWORD,
                { userName: name, forgotPasswordURL: `${variables.FRONTEND_URL}/password?token=${actionToken}` });

            res.json('OK!');
        } catch (e) {
            next(e);
        }
    },

    setNewForgotPassword: async (req, res, next) => {
        try {
            const { authUser: { _id }, body: { password } } = req;
            const token = req.get(AUTHORIZATION);

            const hashPasssword = await passwordService.hash(password);

            await User.findByIdAndUpdate(_id, { password: hashPasssword });
            await ActionTokens.deleteOne({ token });
            await OAuth.deleteMany({ user: _id });

            res.json('OK!');
        } catch (e) {
            next(e);
        }
    }
};
