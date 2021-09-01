const router = require('express').Router();
const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');
const { checkUserRoleMiddleware, getUserByDinamicParam } = require('../middlewares/user.middleware');
const {
    USER_ID, PARAMS, _ID
} = require('../config/constants');

const {
    checkUniqueEmail, validateUserBody, validateUserBodyUpdate, isUserPresent
} = userMiddleware;

router.post('/', validateUserBody, isUserPresent, checkUniqueEmail, userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/:user_id',
    getUserByDinamicParam(USER_ID, PARAMS, _ID),
    userController.getSingleUser);

router.delete('/:user_id',
    getUserByDinamicParam(USER_ID, PARAMS, _ID),
    checkUserRoleMiddleware(['admin']),
    userController.deleteUser);

router.put('/:user_id',
    validateUserBodyUpdate,
    getUserByDinamicParam(USER_ID, PARAMS, _ID),
    checkUniqueEmail,
    userController.updateUser);

module.exports = router;
