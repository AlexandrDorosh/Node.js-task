const router = require('express').Router();

const { authController } = require('../controllers');

router.post('/', authController.loginUser);

router.get('/', authController.registrationUser);

module.exports = router;
