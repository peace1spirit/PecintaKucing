'use strict'

const router = require('express').Router();
const {articleCreate,articleSearch,articleReadByAuthor, articleReadAll, articleReadById, articleUpdate, articleDelete} = require('../controllers/articleController');
const {isLogin} = require('../middleware/isLogin');
//const helpers = require('../helpers/images')
const multer = require('multer')
const upload =  multer({
    fileFilter: function(req,file,cb){      
        if(file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){         
            cb(null,true)
        }else{
            return cb(new Error('Only .jpg, .jpeg, and .png files allowed'), false)
        }
      }, 
      storage: multer.diskStorage({
        //destination: function (req, file, callback) { callback(null, '../client/public/assets/');},
        destination: '../client/public/assets/',
        filename: function (req, file, callback) { callback(null, Date.now() + '-' + file.originalname );}}),
      limits: {
        fileSize: 5 * 1024 * 1024
      }
    })
    
router.get('/', articleReadAll);
router.post('/', isLogin, upload.single('imagefile'), articleCreate);
router.post('/byid', articleReadById);
router.put('/', isLogin,  upload.single('imagefile'), articleUpdate);
router.delete('/', isLogin, articleDelete);
router.post('/search',isLogin,  articleSearch);
router.get('/byauthor',isLogin,  articleReadByAuthor);

module.exports = router;