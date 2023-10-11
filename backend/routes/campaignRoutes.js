const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');
const verifyJWT = require('../middleware/verifyJWT')

router.get("/all", campaignController.getAll); 
router.get("/:id", campaignController.getCampaign); //get a campaign with its DB ID
router.get("/partner/:id", campaignController.getPartnersCampaigns); //get all one user's campaigns


//routes protected by Verify JWT 
router.post("/", verifyJWT, campaignController.createCampaign);//create a campaign


module.exports = router; 