const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
//const helpers = require('../helpers/images')
const { isLogin } = require('../middleware/isLogin');

router.get('/',isLogin ,UserController.getUser)
router.get('/checktoken', isLogin , UserController.checkToken)
router.get('/checktokenadmin', isLogin , UserController.checkadminToken)
router.post('/register',  UserController.register)
router.post('/login', UserController.login)
router.put('/',isLogin, UserController.userUpdate)
router.delete('/:id',isLogin, UserController.userDelete)

module.exports = router;