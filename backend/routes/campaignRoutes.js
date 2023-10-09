const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');

router.get("/all", campaignController.getAll); //this route shoulbe protected by middelware only admin
router.get("/:id", campaignController.getCampaign); //get a campaign with his DB ID
router.get("/partner/:id", campaignController.getPartnersCampaigns); //get all one user's campaigns


router.post("/", campaignController.createCampaign);//should be protected by jwt token!


module.exports = router; 