const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const expressFileUpload = require('express-fileupload');
const expressRateLimit = require('express-rate-limit');
require('dotenv').config();
const cronJobs = require('./cron');

const {
    variables: { PORT, URL, ALLOWED_ORIGINS },
    messages: { NOT_FOUND_MESS },
    statusCodes: { NOT_FOUND, INTERNAL_SERVER_ERROR }
} = require('./config');

const app = express();
mongoose.connect(URL);

app.use(helmet());

app.use(cors({ origin: _configurateCors }));

app.use(expressRateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

if (process.env.NODE_ENV === 'dev') {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

const {
    userRouter,
    carRouter,
    authRouter
} = require('./routes');
const { ErrorHandler } = require('./errors');
const { FORBIDDEN } = require('./config/statusCodes');
const { CORS_NOT_ALLOWED } = require('./config/messages');

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

    cronJobs();
    require('./utils/defaultData.util');
});

function _configurateCors(origin, callback) {
    const whiteList = ALLOWED_ORIGINS.split(';');

    if (!origin && process.env.NODE_ENV === 'dev') {
        return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler(FORBIDDEN, CORS_NOT_ALLOWED), false);
    }

    return callback(null, true);
}
