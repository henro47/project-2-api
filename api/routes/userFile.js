const express = require('express') ;
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const FileController = require('../controllers/userFile') ;
require('dotenv').config();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname + Date.now());
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'text/plain' || file.mimetype === 'text/csv') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });


router.post('/upload/:email', checkAuth,upload.single('user-file') ,FileController.uploadFile);


module.exports = router;