const express = require('express');
const mongoose = require('mongoose');

const expressHbs = require('express-handlebars');
const path = require('path');
const { PORT } = require('./config/variables');

const app = express();
mongoose.connect('mongodb://localhost:27017/apr-2021');

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
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || 404,
        message: err.message || 'Not Found'
    });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message
    });
}

app.listen(PORT, () => {
    // console.log('App listen', PORT);
});
