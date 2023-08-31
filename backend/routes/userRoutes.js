const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.addNewUser);

router.get('/partners', userController.getPartners);
router.get('/members', userController.getMembers);
router.get('/:id', userController.getUser);

router.delete('/:id', userController.deleteUser)

module.exports = router; 