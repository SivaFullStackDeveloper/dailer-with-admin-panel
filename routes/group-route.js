const express = require('express')
const router  = express.Router()
const {removeuserFromGroup,getGroup} = require('../controllers/group-controller')

router.route('/removeUserFromGroup').delete(removeuserFromGroup)
router.route('/getUserGroup').get(getGroup)


module.exports = router