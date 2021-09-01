const router = require('express').Router();

const { authMiddleware } = require('../middlewares');

const { getAuthByDinamicParam, validateUserBody } = authMiddleware;

const { authUser } = require('../controllers/auth.controller');

router.post('/', getAuthByDinamicParam('email', 'params'), validateUserBody, authUser);

module.exports = router;
