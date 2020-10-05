const express = require('express');
const app = express();

const helloWorldRoutes = require('./api/routes/helloworld');

app.use('/helloworld',helloWorldRoutes);

module.exports = app;