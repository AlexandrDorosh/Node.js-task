const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const { PORT } = require('./config/variables');
const users = require('./dataBase/users.js');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const usersDb = path.join(__dirname, 'dataBase', 'users.js');

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
  defaultLayout: false
}))
app.set('views', path.join(__dirname, 'static'));

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/users', (req, res) => {
    res.render('users', {users});
})

app.get('/users/:user_id', (req, res) => {
    const { user_id } = req.params;
    const currentUser = users[user_id];
    if(!currentUser){
        res.status(404).end('NOT FOUND');
        return;
    }
    res.json(currentUser);
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/auth', (req, res) => {
    console.log(req.body);
    fs.readFile(usersDb, (err, data) => {
        if(err){
            res.status(404).end('Not Found');
            return;
        }
        const { login, password } = req.body;
        const arr = JSON.parse(data);
        console.log(typeof(arr));
        const findUser = arr.find(user => user.login === login && user.password === password);
        findUser ? res.render('users', {findUser}) : res.redirect('/registers')
    })
})

app.get('/registers', (req, res) => {
    res.render('registers');
})

app.post('/reg', (req, res) => {
    console.log(req.body);
        const { name, password } = req.body;
        fs.readFile(usersDb, (err, data) => {
            if(err){
                console.log(err);
                return;
            }
            const dataStr = data.toString();
            const users = JSON.parse(dataStr);
            users.forEach(user => {
                if(user.name === name){
                    res.status(404).end('error');
                    return
                }
                users.push({name, password});
            });
        });

        const dataAr = JSON.stringify(users);
        fs.writeFile(usersDb, dataAr, err => {
            if(err){
                console.log(err);
                return;
            }
        });
        res.render('users', {dataAr})
})

// app.post('/result', (req, res) => {
//     console.log(req.body);
//     const { firstNum, secondNum, select } = req.body;
//     const calc = (firstNum, secondNum, select) => {
//         const num1 = firstNum;
//         const num2 = secondNum;
//         const sumvol = select;
//         let result;
//         switch (sumvol){
//             case '+':
//                 result = num1 + num2;
//                 break;
//             case '-':
//                 result = num1 - num2;
//                 break;
//             case '*':
//                 result = num1 * num2;
//                 break;
//             case '/':
//                 result = num1 / num2;
//                 break;
//             default:
//                 result = 'Виберіть операцію';
//         }
//         return result
//     }
//     res.json({
//         result: calc({firstNum, secondNum, select})});
// })

app.listen(PORT, () => {
    console.log('App listen', PORT);
});