const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

//@MIDDELWARE PROTECTION : Only connected whtih good accessToken


router.get('/', authController.refresh);

module.exports = router; 