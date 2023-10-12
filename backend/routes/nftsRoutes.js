const express = require('express');
const nftsController = require('../controllers/nftsController');

const router = express.Router();

//@MIDDELWARE PROTECTION : Only connected whtih good accessToken

//@Desc get all nfts (user not partners)
//@params : none Vérified bye only connected 
//@TODO : Should be accessible for only admin middelware ?
router.get('/refresh', nftsController.refreshNftsDataBase);

//@Desc get all nftsof a user (user not partner)
//@params : address (:id) of the user
//@TODO : Should be protected for only admin middelware and the user himSelf?
router.get('/:id', nftsController.getUserNfts);


module.exports = router; 