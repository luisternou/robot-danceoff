const express = require('express')
const request = require('request');
const router = express.Router()

// Include controllers
const homeController = require('../controllers/home')


router.get('/', homeController.getHome)


module.exports = router