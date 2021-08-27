const router = require('express').Router();
const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

const { isUserPresent, checkUniqueEmail } = userMiddleware;

router.post('/', checkUniqueEmail, userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/:user_id', isUserPresent, userController.getSingleUser);

router.delete('/:user_id', isUserPresent, userController.deleteUser);

router.put('/:user_id', isUserPresent, userController.updateUser);

module.exports = router;
