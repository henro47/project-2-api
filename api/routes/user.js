const express = require('express') ;
const router = express.Router();
const User = require('../models/userSchema');
const mongoose = require('mongoose');
const bycrypt = require('bcrypt');

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
                        url : 'https://project-2-api-hfr.herokuapp.com/user/' + doc._id
                    }
                }
            })
        }
        res.status(200).json(response);
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
                    url : 'https://project-2-api-hfr.herokuapp.com/user/'

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
        contact: req.body.contact,
        national: req.body.national,
        email: req.body.email,
        password: req.body.password
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
                contact: result.contact,
                national: result.national,
                email : result.email,
                password: result.password,
                request : {
                    Type : 'GET',
                    url: 'https://project-2-api-hfr.herokuapp.com/user/' + result._id
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
                url : 'https://project-2-api-hfr.herokuapp.com/user/' + id
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
                url : 'https://project-2-api-hfr.herokuapp.com/user/',
                body: {
                    id : 'String',
                    fName : 'String',
                    lName : 'String',
                    contact: 'String',
                    national: 'String',
                    email : 'String',
                    password: 'String'
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

router.post('/signup',(req, res, next) =>{
    User.find({email: req.body.email}).exec()
    .then(user => {
        if(user.length > 0)
        {
            return res.status(422).json({
                message: 'User already exists in database'
            });
        }
        else
        {
            bycrypt.hash(req.body.password, 10, (err, hash) => {
                if(err)
                {
                    return res.status(500).json({
                        error: err
                    });
                }
                else 
                {
                    const user = new User({
                        _id : new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'user created'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            });
        }
    }) 
});

module.exports = router;