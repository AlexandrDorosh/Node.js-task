const { Schema, model } = require('mongoose');
const { userRoles } = require('../config');

const userRolesEnum = userRoles;

const carSchema = new Schema({
    model: {
        type: String,
        required: true,
        trim: true
    },
    engine: {
        type: String,
        required: true,
        trim: true
    },
    machineNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    color: {
        type: String,
        trim: true
    },
    price: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: userRolesEnum.USER,
        enum: Object.values(userRolesEnum)
    }
}, { timestamps: true });

module.exports = model('car', carSchema);
