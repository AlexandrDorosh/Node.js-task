module.exports = {
    PASSWORD_REGEXP: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/),
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    MACHINE_NUMBER: new RegExp(/^[A-Za-z0-9]+$/),
    CURRENT_YEAR: new Date().getFullYear(),
    USER_ID: 'user_id',
    CAR_ID: 'car_id',
    PARAMS: 'params',
    _ID: '_id',
    EMAIL: 'email',
    AUTHORIZATION: 'Authorization',
    REFRESH: 'refresh',
    USER: 'user',
    USERS: 'users',
    CAR: 'car',
    PHOTO_MAX_SIZE: 5 * 1024 * 1024,
    MIMETYPES: {
        PHOTO: [
            'image/jpeg',
            'image/png'
        ]
    }
};
