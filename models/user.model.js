const mongoose = require('mongoose');
const validator = require('validator');
const userRole=require('../utils/userRoles')

const user = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        validate: [validator.isEmail, " should be valid Email address"]
    },
    password: {
        type: String,
        require: true
    },
    token: {
        type: String,
        require: true
    },
    role:{
        type : String,
        enum:[userRole.ADMIN,userRole.USER],
        default: userRole.USER
    },
    avatar:{
        type : String,
        default: 'uploads/profile.jpg'
    },
}
);

const userModel=mongoose.model('user',user);

module.exports = userModel