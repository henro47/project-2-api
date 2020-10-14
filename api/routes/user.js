const express = require('express') ;
const router = express.Router();
const User = require('../models/userSchema');
const mongoose = require('mongoose');

router.get('/',(req, res, next) => {
    User.find()
    .select('_id idNum fName lName email')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            users: docs.map(doc => {
                return {
                    _id: doc._id,
                    idNum : doc.idNum,
                    fName : doc.fName,
                    lName : doc.lName,
                    email : doc.email,
                    request : {
                        type : 'GET',
                        url : 'http://localhost:5000/user/' + doc._id
                    }
                }
            })
        }
        res.status(200).json(response);
        /*if(docs.length >= 0)
        {
            
        }
        else
        {
            res.status(404).json({
                message: 'No entries found'
            });
        }*/
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:userId', (req, res, next) =>{
    const id = req.params.userId;
    User.findById(id)
    .select('_id idNum fName lName email')
    .exec()
    .then(doc => {
        if(doc)
        {
            res.status(200).json({
                user : doc,
                request: {
                    type : 'GET',
                    description : 'Get all users',
                    url : 'http://localhost:5000/user/'

                }
            });
        }
        else
        {
            res.status(404).json({
                message: 'Entry not found in database'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/',(req, res, next) =>{

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        idNum: req.body.idNum,
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email
    });
    user.save().then(result =>{
        console.log(result);
        res.status(200).json({
            message: 'Created user successfully',
            createdUser: {
                _id: result._id,
                idNum : result.idNum,
                fName : result.fName,
                lName : result.lName,
                email : result.email,
                request : {
                    Type : 'GET',
                    url: 'http://localhost:5000/user/' + result._id
                }
            }
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.patch('/:userId', (req, res, next) =>{
    const id = req.params.userId;
    const updateOps = {};

    for(const ops of req.body)
    {
        updateOps[ops.propName] = ops.value;
    }

    User.update({_id: id}, {$set: updateOps}).exec()
    .then(result => {
        res.status(200).json({
            message: 'User updated',
            request : {
                type : 'GET',
                url : 'http://localhost:5000/user/' + id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

});

router.delete('/:userId', (req, res, next) =>{
    const id = req.params.userId;
    User.remove({_id: id}).exec()
    .then(result => {
        res.status(200).json({
            message : 'User deleted successfully',
            request: {
                type : 'POST',
                url : 'http://localhost:5000/user/',
                body: {
                    id : 'String',
                    fName : 'String',
                    lName : 'String',
                    email : 'String'
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;