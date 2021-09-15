const { PHOTO_MAX_SIZE, MIMETYPES } = require('../config/constants');
const { BAD_REQUEST } = require('../config/statusCodes');
const { WRONG_FILE_FORMAT } = require('../config/messages');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    checkAvatar: (req, res, next) => {
        try {
            if (!req.files || !req.files.avatar) {
                next();
                return;
            }

            const { name, size, mimetype } = req.files.avatar;

            if (size > PHOTO_MAX_SIZE) {
                throw new ErrorHandler(BAD_REQUEST, `File ${name} is too big`);
            }

            if (!MIMETYPES.PHOTO.includes(mimetype)) {
                throw new ErrorHandler(BAD_REQUEST, WRONG_FILE_FORMAT);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
