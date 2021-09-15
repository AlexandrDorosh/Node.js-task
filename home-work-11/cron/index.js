const cron = require('node-cron');

const removeOldTokens = require('./removeOldTokens');
const remindUsers = require('./remindUsers');

module.exports = () => {
    cron.schedule('0 0 1 * *', async () => {
        await removeOldTokens();
    });

    cron.schedule('30 6 * * 1,3,5', async () => {
        await remindUsers();
    });
};
