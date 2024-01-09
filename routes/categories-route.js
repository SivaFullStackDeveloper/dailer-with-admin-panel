const express = require('express')
const router  = express.Router()
const {getAllCategories,createCategorie,updateCategorie,deleteCategorie} = require('../controllers/categories')


router.route('/').get(getAllCategories).post(createCategorie)
router.route('/:id').patch(updateCategorie).delete(deleteCategorie)


module.exports = router