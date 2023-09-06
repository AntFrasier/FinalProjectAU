const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

//middelware only logged in
router.get('/nonce/:id', userController.getNonce);
router.get('/partners', userController.getPartners);
router.get('/members', userController.getMembers);
router.get('/:id', userController.getUser);

//middelware only admin TODO
router.delete('/:id', userController.deleteUser)

module.exports = router; 