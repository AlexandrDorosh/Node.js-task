const router = require('express').Router();
const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

const {
    isUserPresent, checkUniqueEmail, validateUserBody, validateUserBodyUpdate
} = userMiddleware;

router.post('/', validateUserBody, checkUniqueEmail, userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/:user_id', isUserPresent, userController.getSingleUser);

router.delete('/:user_id', isUserPresent, userController.deleteUser);

router.put('/:user_id', validateUserBodyUpdate, isUserPresent, checkUniqueEmail, userController.updateUser);

module.exports = router;
