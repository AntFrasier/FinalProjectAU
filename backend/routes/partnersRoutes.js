
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

//@MIDDELWARE PROTECTION : NONE accessible to all



//@Desc : get all partners
//@Params : none
router.get('/', userController.getPartners);

//@Desc : get a specific partner
//@Params : address (:id) of the partner
router.get('/:id', userController.getOnePartner);

module.exports = router; 