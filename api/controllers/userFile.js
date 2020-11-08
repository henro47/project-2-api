const mongoose = require('mongoose');
const UserFile = require('../models/userFileSchema');
const fs = require('fs');

function getFileData(filePath)
{
  var array = fs.readFileSync(filePath).toString().split('\n');

  console.log(array);
  var usrId, name, lastName, contactNum, nationality ;
  for(var i =0; i < array.length; i++)
  {
    var data = array[i].split(':') ;
    if(array[i].includes('first'))
    {
      name = data[1] ;
    }

    if(array[i].includes('last'))
    {
      lastName = data[1] ;
    }

    if(array[i].includes('id'))
    {
      usrId = data[1] ;
    }

    if(array[i].includes('contact') || array[i].includes('number'))
    {
      contactNum = data[1] ;
    }

    
    if(array[i].includes('nat') || array[i].includes('origin'))
    {
      nationality = data[1] ;
    }
  }

  const userData = {
    idNum: usrId,
    fName: name,
    lName: lastName,
    contact: contactNum,
    national: nationality
  }

  console.log(userData);

  return userData;

}


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
        return file.save();
      })
      .then(result => {
        const u_email = req.params.email;
        UserFile.remove({email: u_email}).exec()
        .then(result => {
          data = getFileData(req.file.path);
          fs.unlink(req.file.path, (output) =>{
            console.log(output);
          });
          res.status(200).json({
            message : 'File uploaded and deleted' ,  
            userData : data 
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
