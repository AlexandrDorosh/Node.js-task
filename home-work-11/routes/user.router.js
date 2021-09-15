const router = require('express').Router();
const { userController } = require('../controllers');
const { userMiddleware, authMiddleware, fileMiddleware: { checkAvatar } } = require('../middlewares');
const {
    USER_ID, PARAMS, _ID, EMAIL
} = require('../config/constants');
const { ADMIN } = require('../config/user-roles.enum');

const {
    isUserNotPresent,
    validateUserBody,
    validateUserBodyUpdate,
    isUserPresent,
    getUserByDinamicParam,
    checkUserRoleMiddleware,
    ifUserAccess
} = userMiddleware;

router.post('/', validateUserBody, checkAvatar, getUserByDinamicParam(EMAIL), isUserPresent, userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/:user_id',
    getUserByDinamicParam(USER_ID, PARAMS, _ID),
    userController.getSingleUser);

router.delete('/:user_id',
    authMiddleware.validateAccessToken,
    getUserByDinamicParam(USER_ID, PARAMS, _ID),
    isUserNotPresent,
    checkUserRoleMiddleware([ADMIN]),
    userController.deleteUser);

router.put('/:user_id',
    validateUserBodyUpdate,
    checkAvatar,
    authMiddleware.validateAccessToken,
    getUserByDinamicParam(USER_ID, PARAMS, _ID),
    isUserNotPresent,
    ifUserAccess,
    userController.updateUser);

module.exports = router;
