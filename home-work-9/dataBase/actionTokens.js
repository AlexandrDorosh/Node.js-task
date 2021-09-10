const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum } = require('../config');

const { ACTION_TOKEN, USER } = dataBaseTablesEnum;

const ActionTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model(ACTION_TOKEN, ActionTokenSchema);
