const express = require('express')
const router = express.Router()
const { body } = require('express-validator')

// Include controllers
const homeController = require('../controllers/danceoff')


// router.get('/', homeController.getDanceoff)
router.post('/', [
     body('danceoffs'),
     body('danceoffId')

 ], homeController.postDanceoff)

module.exports = router