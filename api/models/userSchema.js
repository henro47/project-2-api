const e = require('express');
const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    idNum: {type: String, default: 'empty'},
    fName: {type: String, default: 'empty'},
    lName: {type: String, default: 'empty'},
    contact: {type: String, default: 'empty'},
    national: {type: String, default: 'empty'},
    email: {type: String, required: true},
    password : {type: String, required: true}    
});

module.exports = mongoose.model('User',userSchema);