const mongoose = require('mongoose');
const UserFile = require('../models/userFileSchema');
const fs = require('fs');

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

  exports.deleteFile = (req, res, next) => {
    const id = req.params.email;
    UserFile.remove({email: id}).exec()
    .then(result => {
      fs.unlink('file path here', (output) =>{
        console.log(output);
      });
      res.status(200).json({
        message : 'User deleted successfully'    
      });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
  }