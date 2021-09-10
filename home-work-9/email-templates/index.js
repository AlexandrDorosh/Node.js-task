const { emailActionEnum } = require('../config');

module.exports = {
    [emailActionEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'WELCOME !!!'
    },
    [emailActionEnum.UPDATE]: {
        templateName: 'update',
        subject: 'User was updated'
    },
    [emailActionEnum.AUTH]: {
        templateName: 'auth',
        subject: 'User was auth'
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
