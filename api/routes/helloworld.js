const express = require('express') ;
const router = express.Router();

router.get('/', (req, res, next) =>{
    /*const messageBody = {
        name: req.body.message
    };*/
    res.status(200).json({
        message: 'Hello World! GET!',
        //bodyMessage: name
    });
});


module.exports = router;