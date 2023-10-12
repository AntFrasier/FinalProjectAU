const User = require("../model/User");
const Campaign = require("../model/Campaign");
const { getMyNfts } = require("../utils/getMyNfts");

// @desc post new nft 
// @route Post /nfts/new
async function newNft(req, res) {
   //@todo
}

// @desc Get all User nfts 
// @route get /nfts/:id
async function getUserNfts(req, res) { 
    const { id } = req.params; //id stand for address in the params
    try {
        const existUser = await User.findOne({address : id}).exec();
        const campaigns = await Campaign.find().exec();
        // console.log("camapigns : ,",campaigns)
        if (!campaigns) return res.status(204).send({message: "No campaigns in dataBase."});
        if (!existUser) return res.status(204).send({message: "no user"});
        const contracts = campaigns.map((campaign)=> campaign.nFTContractAddress);
        const myNfts = await getMyNfts(existUser.address, contracts);
        res.status(200).send({myNfts: myNfts?.ownedNfts})
       
    } catch (err) {
        console.error(err);
        res.status(500).send({message : `serveur erreur : ${err}`});
    }
}



// @desc refresh the dataBase with all Nfts that have been minted ever 
// @route get /nfts/refresh
async function refreshNftsDataBase(req, res) { 
    //@todo
}


module.exports = { getUserNfts, refreshNftsDataBase };