const express = require('express')
const router = express.Router()

// Include controllers
const homeController = require('../controllers/teams')


router.get('/', homeController.getTeams)


module.exports = router