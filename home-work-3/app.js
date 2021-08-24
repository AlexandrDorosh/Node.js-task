const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const { PORT } = require('./config/variables');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
    defaultLayout: false
}));
app.set('views', path.join(__dirname, 'static'));

const {
    authRouter,
    userRouter,
    menuRouter,
    registrationRouter,
    helloRouter
} = require('./routes');

app.get('/ping', (req, res) => res.json('Pong'));

app.use('/', menuRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/registration', registrationRouter);
app.use('/hello', helloRouter);

app.listen(PORT, () => {
    // console.log('App listen', PORT);
});
