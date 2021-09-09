const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum } = require('../config');

const { OAuth, USER } = dataBaseTablesEnum;

const OAuthSchema = new Schema({
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    }
}, { timestamps: true });

module.exports = model(OAuth, OAuthSchema);