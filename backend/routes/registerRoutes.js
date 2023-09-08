const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();


//@MIDDELWARE PROTECTION : NONE


//@Desc : Register a new user/partner
//@params : {user : {name(_required), address(_required), role(_required), webSite?, signedHash?}}
router.post('/', userController.RegisterUser);

module.exports = router; 