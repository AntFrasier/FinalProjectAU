const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');

router.get("/all", campaignController.getAll); //this route shoulbe protected by middel ware only admin
router.get("/partner/:id", campaignController.getPartnersCampaigns); //get all one user's campaigns

router.post("/", campaignController.createCampaign);


module.exports = router; 