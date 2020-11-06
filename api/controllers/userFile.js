const mongoose = require('mongoose');
const UserFile = require('../models/userFileSchema');
const User = require('../models/userSchema');



exports.uploadFile = (req, res, next) => {
    const id = req.params.email;
    User.find({email: id}).exec()
      .then(user => {
        if (!user) {
          return res.status(404).json({
            message: "user not found"
          });
        }
        const file = new UserFile({
          _id: mongoose.Types.ObjectId(),
          user : req.params.email,
          userFile: req.file.path
        });
        return file.save();
      })
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "file stored"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };