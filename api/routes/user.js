const express = require('express') ;
const router = express.Router();
const User = require('../models/userSchema');
const mongoose = require('mongoose');

router.get('/',(req, res, next) => {
    User.find().exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
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
    User.findById(id).exec()
    .then(doc => {
        if(doc)
        {
            res.status(200).json(doc);

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
        idNum: req.body.id,
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email
    });
    user.save().then(result =>{
        console.log(result);
        res.status(200).json({
            message: 'Handling POST requests to /user',
            createdUser: user
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//FIx this
router.patch('/:userId', (req, res, next) =>{
    const id = req.body.userId;
    const updateOps = {};

    for(const ops of req.body)
    {
        updateOps[ops.propName] = ops.value;
    }

    User.update({_id: id}, {$set: updateOps}).exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
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
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;