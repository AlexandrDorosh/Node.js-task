const router = require('express').Router();

const { authMiddleware } = require('../middlewares');

const { getAuthByDinamicParam, validateUserBody } = authMiddleware;

const { authUser } = require('../controllers/auth.controller');
const { EMAIL } = require('../config/constants');

router.post('/', validateUserBody, getAuthByDinamicParam(EMAIL), authUser);

module.exports = router;
