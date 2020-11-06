const express = require('express') ;
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const FileController = require('../controllers/userFile') ;
require('dotenv').config();

router.post('/upload/:email', FileController.uploadFile);

module.exports = router;