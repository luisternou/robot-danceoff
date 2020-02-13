const express = require('express')
const router = express.Router()

// Include controllers
const leaderboardController = require('../controllers/leaderboard')
router.get('/', leaderboardController.getLeaderboard)
module.exports = router