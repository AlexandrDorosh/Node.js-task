const fs = require('fs');
const path = require('path');

const usersDb = path.join(process.cwd(), 'dataBase', 'users.json');

module.exports = {
    authUser: () => {
        let users;
        fs.readFile(usersDb, (err, data) => {
            if (err) {
                return 'Not Found';
            }
            users = JSON.parse(data);
        });
        return users;
    }
};
