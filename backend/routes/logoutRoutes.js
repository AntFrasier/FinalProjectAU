const express = require('express');
const authController = require('../controllers/authController')

const router = express.Router();

router.get('/:id', authController.logout);

module.exports = router; 