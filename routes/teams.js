const express = require('express')
const router = express.Router()

// Include controllers
const teamController = require('../controllers/teams')
router.get('/', teamController.getTeams)
module.exports = router 