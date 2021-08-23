const fs = require('fs');
const path = require('path');

const usersDb = path.join(__dirname, 'dataBase', 'users.json');

module.exports = {
    loginUser: (req, res) => {
        fs.readFile(usersDb, (err, data) => {
            if (err) {
                res.status(404).end('Not Found');
                return;
            }
            const { login, password } = req.body;
            const arr = JSON.parse(data);
            const findUser = arr.find((user) => user.login === login && user.password === password);
            if (findUser) {
                res.render('hello', { findUser });
            }
            res.redirect('/registration');
        });
    }
};
