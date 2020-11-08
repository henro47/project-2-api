const mongoose = require('mongoose');
const UserFile = require('../models/userFileSchema');
const fs = require('fs');
const ReadUserFile = require('../scripts/readUserFile');

exports.uploadFile = (req, res, next) => {
    const id = req.params.email;
    UserFile.find({email: id}).exec()
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
        ReadUserFile.readFileFromInput(req.file.path);
        return file.save();
      })
      .then(result => {
        const u_email = req.params.email;
        UserFile.remove({email: u_email}).exec()
        .then(result => {
          fs.unlink(req.file.path, (output) =>{
            console.log(output);
          });
          res.status(200).json({
            message : 'File uploaded and deleted'    
          });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };
