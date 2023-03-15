const User = require("../model/User");
const Campaign = require("../model/Campaign");

//todo add protection to conncted users

// @desc Get all campaigns ONLY ADMIN SHOULD SEE THAT
// @route Get /campaign/all
async function getAll (req, res) {
    try {
    const campaigns = await Campaign.find().exec();
    } catch (err) {
        res.status(500).send({message : `serveur erreur : ${err}`})
    }
}

// @desc Get campaigns from a spécific partners
// @route Get /campaign/partner/:id
async function getPartnersCampaigns (req, res) {
    const { id } = req.params
    const existUser = await User.findOne({address : id}).exec();
    try {
    const campaigns = await Campaign.find({user : existUser}).exec();
    } catch (err) {
        res.status(500).send({message : `serveur erreur : ${err}`})
    }
}


// @desc Create a campaign
// @route Post /campaign
async function createCampaign(req, res) {
    const { user, campaign } = req.body;
    if (!user) return res.status(400).send({message : "user Required"});
    //chek if user allready exist
    const existUser = await User.findOne({address : user.address}).exec();
    if (!existUser) return res.status(403).send({message: "Must be registred"});
    try {
        const result = await Campaign.create ({
            "user" : existUser,
            "name": campaign.name,
        })
        console.log(result);
        res.status(201).send({message : `New campaign ${campaign.name} created.`})
    } catch (err) {
        console.error(err);
        res.status(500).send({message : `serveur erreur : ${err}`});
    }

}
// @desc Delete a campaign
// @route Delete /campaign:id
async function deleteCampaign(req, res) {

}
// @desc modify a campaign
// @route Patch /campaign:id
async function patchCampaign(req, res) {

}

// @desc get all a user's campaign
// @route Post /campaign
async function createCampaign(req, res) {
   
}

module.exports = { createCampaign, getAll, getPartnersCampaigns };