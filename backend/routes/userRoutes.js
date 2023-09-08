const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

//@MIDDELWARE PROTECTION : Only connected whtih good accessToken

//@Desc get all members (user not partners)
//@params : none Vérified bye only connected 
//@TODO : Should be accessible for only admin middelware ?
router.get('/members', userController.getMembers);

//@Desc get a spécific members / user (user not partner)
//@params : address (:id) of the user
//@TODO : Should be protected for only admin middelware and the user himSelf?
router.get('/:id', userController.getUser);

//@Desc Delete 1 user/ partner 
//@params address (:id) of the user to delete
//@TODO : Should be accessible for only admin middelware ?
router.delete('/:id', userController.deleteUser)

module.exports = router; 