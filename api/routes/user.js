const express = require('express') ;
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const UserController = require('../controllers/user') ;
require('dotenv').config();



router.get('/',checkAuth,UserController.user_get_all);

router.get('/:userId', checkAuth, UserController.user_get_single );

router.patch('/:userId', checkAuth , UserController.user_patch);

router.delete('/:userId', checkAuth, UserController.user_delete);

router.post('/signup', UserController.user_signup);

router.post('/login', UserController.user_login);

module.exports = router;