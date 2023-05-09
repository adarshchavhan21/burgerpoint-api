const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    photo: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    address: {
        name: String,
        street: String,
        state: String,
        city: String,
        pinCode: String,
        phoneNo: String
    }
},{timestamps: true});

module.exports = model('User', userSchema);