const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    idNum: String,//{type: String, required: true},
    fName: String,//{type: String, required: true},
    lName: String,//{type: String, required: true},
    email: String//{type: String, required: true}
});

module.exports = mongoose.model('User',userSchema);