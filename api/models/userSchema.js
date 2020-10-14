const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    idNum: String,
    fName: String,
    lName: String,
    email: String
});

module.exports = mongoose.model('User',userSchema);