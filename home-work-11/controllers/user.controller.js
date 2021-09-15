const {
    passwordService, emailService, userService: { getAllUsers, deleteUser, updateUser }, s3Service
} = require('../services');
const {
    statusCodes: { CREATED, DELETED },
    messages: { UPDATED_MESS },
    emailActionEnum,
    constants: { USERS }
} = require('../config');
const { User } = require('../dataBase');
const { userUtil: { userNormalizator } } = require('../utils');

const { userRoles } = require('../config');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { password, name, email } = req.body;

            const hashedPassword = await passwordService.hash(password);

            let createdUser = await User.create({ ...req.body, password: hashedPassword });

            if (req.files && req.files.avatar) {
                const s3response = await s3Service.uploadFile(req.files.avatar, USERS, createdUser._id);
                createdUser = await User.findByIdAndUpdate(createdUser._id,
                    { avatar: s3response.Location },
                    { new: true });
            }

            const userToReturn = userNormalizator(createdUser);

            await emailService.sendMail(
                email,
                emailActionEnum.WELCOME,
                { userName: name }
            );

            res.status(CREATED).json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const users = await getAllUsers();

            const userToReturn = users.map((user) => userNormalizator(user));

            res.json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    getSingleUser: (req, res, next) => {
        try {
            const userToReturn = userNormalizator(req.user);

            res.json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const { name, email } = req.user;
            await deleteUser(user_id);

            if (req.user.role === userRoles.USER) {
                await emailService.sendMail(
                    email,
                    emailActionEnum.USER_BLOCKED_SOFT,
                    { userName: name }
                );
            } else {
                await emailService.sendMail(
                    email,
                    emailActionEnum.USER_BLOCKED_ADMIN,
                    { userName: name }
                );
            }

            res.sendStatus(DELETED);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { params: { user_id }, body, user: { email, name } } = req;

            if (req.files && req.files.avatar) {
                const s3response = await s3Service.uploadFile(req.files.avatar, USERS, user_id);
                await User.findByIdAndUpdate(user_id,
                    {
                        ...req.body,
                        avatar: s3response.Location
                    },
                    { new: true });
            }

            await updateUser(user_id, body);

            await emailService.sendMail(
                email,
                emailActionEnum.UPDATE,
                { userName: name }
            );

            res.status(CREATED).json(UPDATED_MESS);
        } catch (e) {
            next(e);
        }
    },
};
