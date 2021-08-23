const router = require('express').Router();

const { loginController } = require('../controllers');

router.get('/', loginController);

module.exports = router;