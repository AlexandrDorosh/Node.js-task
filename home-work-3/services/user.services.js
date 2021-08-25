const fs = require('fs');
const util = require('util');

const readUserFile = util.promisify(fs.readFile);
const writeUserFile = util.promisify(fs.writeFile);

module.exports = {
    authUserRead: async (usersDb) => {
        try {
            const data = await readUserFile(usersDb);
            return JSON.parse(data.toString());
        } catch (e) {
            return e;
        }
    },

    authUserWrite: async (usersDb, users) => {
        try {
            await writeUserFile(usersDb, JSON.stringify(users));
        } catch (e) {
            return e;
        }
    }
};
