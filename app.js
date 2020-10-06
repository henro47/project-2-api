const express = require('express');
const app = express();
const morgan = require('morgan');

const helloWorldRoutes = require('./api/routes/helloworld');

app.use(morgan('dev'));

app.use('/helloworld',helloWorldRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500) ;
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;