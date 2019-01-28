var mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const user = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 250
    },
    avtar: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18,
        max: 70
    }
});

user.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, 'privateKey')
    return token;
}

module.exports = mongoose.model('users', user); 