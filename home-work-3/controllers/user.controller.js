const fs = require('fs');
const path = require('path');

const usersDb = path.join(__dirname, 'dataBase', 'users.json');

module.exports = {
    createUser: (req, res) => {
        console.log(req.body);
        const { login } = req.body;
        fs.readFile(usersDb, (err, data) => {
            if(err){
                res.status(404).end('Not Found');
                return;
            }
            const dataStr = data.toString();
            const arr = dataStr ? JSON.parse(data.toString()) : [];

            const findRegUser = arr.find(user => user.login === login);
            if(findRegUser){
                return res.status(404).end("Sorry, but you are already registered");
            }
            arr.push(req.body);

            fs.writeFile(usersDb, JSON.stringify(arr), err => {
                if(err){
                    res.status(404).end('Not Found');
                    return;
                }
                res.redirect('/login');
            })
        });
    },

    getSingleUser: (req, res) => {
        const { user_id } = req.params;
        fs.readFile(usersDb, (err, data) => {
            if (err) {
                res.status(404).end('Not Found');
                return;
            }
            const users = JSON.parse(data);
            const currentUser = users[user_id];
            if(!currentUser){
                res.status(404).end('NOT FOUND');
                return;
            }
            res.json(currentUser);
        })
    },

    getAllUsers: (req, res) => {
        // fs.readFile(usersDb, (err, data) => {
        //     if (err) {
        //         res.status(404).end('Not Found');
        //         return;
        //     }
        //     const users = JSON.parse(data);
        //     res.render('users', {users});
        // })
        res.json("OK");
    }
}