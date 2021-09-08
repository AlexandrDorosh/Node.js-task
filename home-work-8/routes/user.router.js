const router = require('express').Router();
const { userController } = require('../controllers');
const { userMiddleware, authMiddleware } = require('../middlewares');
const {
    USER_ID, PARAMS, _ID, EMAIL
} = require('../config/constants');

const {
    isUserNotPresent,
    validateUserBody,
    validateUserBodyUpdate,
    isUserPresent,
    getUserByDinamicParam,
    checkUserRoleMiddleware,
    ifUserAccess
} = userMiddleware;

router.post('/', validateUserBody, getUserByDinamicParam(EMAIL), isUserPresent, userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/:user_id',
    getUserByDinamicParam(USER_ID, PARAMS, _ID),
    userController.getSingleUser);

router.delete('/:user_id',
    authMiddleware.validateAccessToken,
    getUserByDinamicParam(USER_ID, PARAMS, _ID),
    isUserNotPresent,
    checkUserRoleMiddleware(['admin']),
    userController.deleteUser);

router.put('/:user_id',
    validateUserBodyUpdate,
    getUserByDinamicParam(EMAIL),
    isUserNotPresent,
    getUserByDinamicParam(USER_ID, PARAMS, _ID),
    ifUserAccess,
    userController.updateUser);

module.exports = router;
