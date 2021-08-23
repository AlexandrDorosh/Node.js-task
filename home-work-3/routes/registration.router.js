const router = require('express').Router();

const { registrationController } = require('../controllers');

router.get('/', registrationController.showRegistration);



module.exports = router;