const { emailActionEnum } = require('../config');

module.exports = {
    [emailActionEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'WELCOME !!!'
    },
    [emailActionEnum.CREATE]: {
        templateName: 'create',
        subject: 'User was created'
    },
    [emailActionEnum.USER_BLOCKED_ADMIN]: {
        templateName: 'accountBlockedAdmin',
        subject: 'Oops you was blocked'
    },
    [emailActionEnum.USER_BLOCKED_SOFT]: {
        templateName: 'accountBlockedSoft',
        subject: 'Oops you was blocked'
    }
};
