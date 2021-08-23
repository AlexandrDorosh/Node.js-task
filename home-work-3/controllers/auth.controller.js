const fs = require('fs');
const path = require('path');

const usersDb = path.join(__dirname, 'dataBase', 'users.json');
console.log(__dirname);

module.exports = {
    loginUser: (req, res) => {
        fs.readFile(usersDb, (err, data) => {
            console.log(__dirname);
            if(err){
                console.log(__dirname);
                res.status(404).end('Not Found');
                return;
            }
            const { login, password } = req.body;
            const arr = JSON.parse(data);
            const findUser = arr.find(user => user.login === login && user.password === password);
            findUser ?
                res.render('hello', {findUser}) :
                res.redirect('/registration');
        })
    }
}