const User = require("../model/User");
const Campaign = require("../model/Campaign");
const {getLastPartnerCampaigns} = require("../utils/getPartnerCampaigns");

//todo add protection to connected users

// @desc Get all campaigns ONLY ADMIN SHOULD SEE THAT
// @route Get /campaign/all
async function getAll (req, res) {
    try {
    const campaigns = await Campaign.find().exec();
    res.status(200).send({campaigns})
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
        const myContracts = await getLastPartnerCampaigns(existUser.address);
        if (myContracts) res.status(404).send({message: "No contract found, please deployed contracts first"})
        const result = await Campaign.create ({
            "user" : existUser,
            "name": campaign.name,
            "website": campaign.website,
            "PayementAddress": existUser.address,
            "NFTContractAddress": myContracts[0],
            "contractAddress": myContracts[1],
            //@todo add the required number of use
            //@todo add the avaibility (in days)
            //@todo add the disocunt proposed
            
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

module.exports = { createCampaign, getAll, getPartnersCampaigns };