const router = require('express').Router();

const { authMiddleware, userMiddleware } = require('../middlewares');

const {
    getAuthByDinamicParam, validateUserBody, validateAccessToken, validateRefreshToken
} = authMiddleware;

const { authUser, logoutUser, refresh } = require('../controllers/auth.controller');
const { EMAIL } = require('../config/constants');

router.post('/', validateUserBody, getAuthByDinamicParam(EMAIL), userMiddleware.isUserNotPresent, authUser);

router.post('/logout', validateAccessToken, logoutUser);

router.post('/refresh', validateRefreshToken, refresh);

module.exports = router;
