const router = require('express').Router();

const { authMiddleware } = require('../middlewares');

const { isUserPresent, validateUserBody } = authMiddleware;

const { authUser } = require('../controllers/auth.controller');

router.post('/', isUserPresent, validateUserBody, authUser);

module.exports = router;
