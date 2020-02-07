const express = require('express')
const router = express.Router()

const competitionController = require('../controllers/competition')

// get shops
router.get('/', competitionController.getStartCompetition)