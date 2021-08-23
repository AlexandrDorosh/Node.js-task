const router = require('express').Router();

const {menuController} = require("../controllers");

router.get('/', menuController);

module.exports = router;