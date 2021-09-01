const router = require('express').Router();
const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');
const { checkUserRoleMiddleware, getUserByDinamicParam } = require('../middlewares/user.middleware');

const {
    checkUniqueEmail, validateUserBody, validateUserBodyUpdate
} = userMiddleware;

router.post('/', validateUserBody, getUserByDinamicParam('email', 'body'), checkUniqueEmail, userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/:user_id',
    getUserByDinamicParam('user_id', 'params', '_id'),
    userController.getSingleUser);

router.delete('/:user_id',
    getUserByDinamicParam('user_id', 'params', '_id'),
    checkUserRoleMiddleware(['admin']),
    userController.deleteUser);

router.put('/:user_id',
    validateUserBodyUpdate,
    getUserByDinamicParam('user_id', 'params', '_id'),
    checkUniqueEmail,
    userController.updateUser);

module.exports = router;
