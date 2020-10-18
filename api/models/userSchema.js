const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    idNum: {type: String, required: true},
    fName: {type: String, required: true},
    lName: {type: String, required: true},
    email: {type: String, required: true}
});

module.exports = mongoose.model('User',userSchema);