const router = require('express').Router();

const { helloController } = require('../controllers');

router.post('/', helloController);

module.exports = router;
