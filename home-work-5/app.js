const express = require('express');
const mongoose = require('mongoose');

const { variables, messages, statusCodes } = require('./config');

const { PORT, URL } = variables;

const app = express();
mongoose.connect(URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { NOT_FOUND, INTERNAL_SERVER_ERROR } = statusCodes;

const { NOT_FOUND_MESS } = messages;

const {
    userRouter,
    carRouter,
    authRouter
} = require('./routes');

app.get('/ping', (req, res) => res.json('Pong'));

app.use('/auth', authRouter);
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
    console.log('App listen', PORT);
});
