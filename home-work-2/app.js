const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const { PORT } = require('./config/variables');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const usersDb = path.join(__dirname, 'dataBase', 'users.json');

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
    fs.readFile(usersDb, (err, data) => {
        if (err) {
            res.status(404).end('Not Found');
            return;
        }
        const users = JSON.parse(data);
        res.render('users', {users});
    })
});

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

app.get('/hello', (req, res) => {
    res.render('hello');
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
        findUser ?
            res.render('hello', {findUser}) :
            res.redirect('/registers');
    })
})

app.get('/registers', (req, res) => {
    res.render('registers');
})

app.post('/reg', (req, res) => {
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
                return res.status(404).end("sorry you are have");
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