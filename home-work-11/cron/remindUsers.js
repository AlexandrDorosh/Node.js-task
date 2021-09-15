const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const { OAuth } = require('../dataBase');

const { emailService: { sendMail } } = require('../services');
const { emailActionEnum: { REMIND_USER } } = require('../config');

dayJs.extend(utc);

module.exports = async () => {
    const logoutAfterTenDays = dayJs.utc().subtract(10, 'days');

    const remindUsers = await OAuth.find({ createdAt: { $lte: logoutAfterTenDays } });

    remindUsers.map(async ({ user }) => {
        await sendMail(
            user.email,
            REMIND_USER,
            { userName: user.name }
        );
    });
};
