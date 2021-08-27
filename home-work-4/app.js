const express = require('express');
const mongoose = require('mongoose');

const { PORT } = require('./config/variables');

const app = express();
mongoose.connect('mongodb://localhost:27017/apr-2021');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { NOT_FOUND, INTERNAL_SERVER_ERROR } = require('./config/statusCodes');

const { NOT_FOUND_MESS } = require('./config/messages');

const {
    userRouter,
    carRouter
} = require('./routes');

app.get('/ping', (req, res) => res.json('Pong'));

app.use('/users', userRouter);
app.use('/cars', carRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || NOT_FOUND,
        message: err.message || NOT_FOUND_MESS
    });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res.status(err.status || INTERNAL_SERVER_ERROR).json({
        message: err.message
    });
}

app.listen(PORT, () => {
    // console.log('App listen', PORT);
});
