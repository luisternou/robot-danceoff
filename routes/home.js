const express = require('express')
const router = express.Router()


// Include controllers
const homeController = require('../controllers/home')

router.get('/', homeController.getAllShops)