const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum, constants } = require('../config');

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
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

OAuthSchema.pre('findOne', function() {
    this.populate(constants.USER);
});

module.exports = model(OAuth, OAuthSchema);
