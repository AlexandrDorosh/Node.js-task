const userService = require('../services/user.services');

const { authUser } = userService;

module.exports = {
    loginUser: (req, res) => {
        const { login, password } = req.body;
        const findUser = authUser.find((user) => user.login === login && user.password === password);
        if (findUser) {
            return res.render('hello', { findUser });
        }
        return res.redirect('/registration');
    },

    registrationUser: (req, res) => {
        res.render('auth');
    }
};

// module.exports = {
//     loginUser: (req, res) => {
//         fs.readFile(usersDb, (err, data) => {
//             if (err) {
//                 res.status(404).end('Not Found');
//                 return;
//             }
//             const { login, password } = req.body;
//             const arr = JSON.parse(data);
//             const findUser = arr.find((user) => user.login === login && user.password === password);
//             if (findUser) {
//                 res.render('hello', { findUser });
//             }
//             res.redirect('/registration');
//         });
//     }
// };
