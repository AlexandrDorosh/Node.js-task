const router = require('express').Router();

const {
    authMiddleware: {
        getAuthByDinamicParam,
        validateUserBody,
        validateAccessToken,
        validateRefreshToken,
        validateActionToken
    }, userMiddleware: { isUserNotPresent, validateNewPassword }
} = require('../middlewares');

const {
    authUser, logoutUser, refresh, sendEmailForgotPassword, setNewForgotPassword
} = require('../controllers/auth.controller');

const { actionTokensEnum: { FORGOT_PASS }, constants: { EMAIL } } = require('../config');

router.post('/', validateUserBody, getAuthByDinamicParam(EMAIL), isUserNotPresent, authUser);

router.post('/logout', validateAccessToken, logoutUser);

router.post('/refresh', validateRefreshToken, refresh);

router.post('/password/forgot/send', getAuthByDinamicParam(EMAIL), isUserNotPresent, sendEmailForgotPassword);

router.post('/password/forgot/set', validateNewPassword, validateActionToken(FORGOT_PASS), setNewForgotPassword);

module.exports = router;
