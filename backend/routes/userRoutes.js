const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.RegisterUser);
router.get('/nonce/:id', userController.getNonce);

//middelware only logged in
router.get('/partners', userController.getPartners);
router.get('/members', userController.getMembers);
router.get('/:id', userController.getUser);

//middelware only admin
router.delete('/:id', userController.deleteUser)

module.exports = router; 