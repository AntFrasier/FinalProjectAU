const User = require("../model/User");
const Campaign = require("../model/Campaign");
const {getLastPartnerCampaigns} = require("../utils/getPartnerCampaigns");

//todo add protection to connected users

// @desc Get all campaigns ONLY ADMIN SHOULD SEE THAT
// @route Get /campaign/all
async function getAll (req, res) {
    try {
    const campaigns = await Campaign.find().exec();
    return res.status(200).send({campaigns})
    } catch (err) {
        res.status(500).send({message : `serveur erreur : ${err}`})
    }
}

// @desc Get campaigns from a spécific partners
// @route Get /campaign/partner/:id
async function getPartnersCampaigns (req, res) {
    const { id } = req.params
    try {
        const existUser = await User.findOne({address : id}).exec();
        if (!existUser) return res.status(204).send({message :" no user found"});
        const campaigns = await Campaign.find({user : existUser}).exec();
        if (!campaigns) return res.status(204).send({message :" no campaign found"});
        res.status(200).send({campaigns});
    } catch (err) {
        res.status(500).send({message : `serveur erreur : ${err}`})
    }
}

// @desc Get a campaign from its ID
// @route Get /campaign/:id
async function getCampaign (req, res) {
    const { id } = req.params
    try {
        const existCampaign = await Campaign.findOne({_id : id}).exec();
        if (!existCampaign) return res.status(204).send({message :" no campaign found"});
        res.status(200).send({campaign: existCampaign});
    } catch (err) {
        res.status(500).send({message : `serveur erreur : ${err}`})
    }
}


// @desc Create a campaign
// @route Post /campaign
//@todo throw an error if the campaign allready exist ?
async function createCampaign(req, res) {
    const { user, campaign } = req.body;
    if (!user) return res.status(400).send({message : "user Required"});
    //chek if user allready exist
    const existUser = await User.findOne({address : user.address}).exec();
    if (!existUser) return res.status(403).send({message: "Must be registred"});
    try {
        const myContracts = await getLastPartnerCampaigns(existUser.address); //get the last created nft and vendor contracts
        if (!myContracts) return res.status(404).send({message: "No contract found, please deployed contracts first"})
        const result = await Campaign.create ({
            "user" : existUser,
            "name": campaign.name,
            "website": campaign.website,
            "description": campaign.description,
            "payementAddress": existUser.address,
            "nFTContractAddress": myContracts[0],
            "vendorContractAddress": myContracts[1],
            "required": campaign.required,
            "validity": campaign.validity,
            "percent": campaign.percent,
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

// @desc get all user's campaign
// @route Post /campaign
// async function createCampaign(req, res) {
   
// }

module.exports = { createCampaign, getAll, getPartnersCampaigns, getCampaign };