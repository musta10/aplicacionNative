'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var UserSchema = Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }, 
    image: String,
    role: String
},{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('User', UserSchema)