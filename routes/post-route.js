const express = require('express')
const router  = express.Router()
const {getAllPostsByLocation,createPost,updatePost,deletePost,addPostComment,updatePostComment,deletePostComment,likePostOrRemoveLike} = require('../controllers/post-controller')
const multer  = require('multer')
const fileFilter = (req, file, cb) => {
    if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
        cb(null, true);
    } else{
        cb(null, false);

    }
};
var storage = multer.diskStorage({
    fileFilter: fileFilter,
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now() + "--" +file.originalname)
    }
})
var upload = multer({ storage: storage })


router.post('/createPost',upload.single('postPicture'),createPost)
router.route('/updatePost').patch(updatePost)
router.route('/deletePost').delete(deletePost)
router.route('/getAllPostsByLocation').get(getAllPostsByLocation)
router.route('/addPostComment').post(addPostComment)
router.route('/likePost').post(likePostOrRemoveLike)
router.route('/deletePostComment').delete(deletePostComment)
router.route('/updatePostComment').patch(updatePostComment)
module.exports = router