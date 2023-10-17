const User = require("../model/User");
const Campaign = require("../model/Campaign");
const { getMyNfts } = require("../utils/getMyNfts");
const { getTokenIdUri } =require("../utils/getTokenIdDatas")

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
        res.status(200).send({myNfts: myNfts})
       
    } catch (err) {
        console.error(err);
        res.status(500).send({message : `serveur erreur while gettint user Nfts: ${err}`});
    }
}

// @desc Get the token Uri directly from the contract not from alchemy.nft 
// @route post /nfts/tokenUri/
async function getRefreshedTokenUri(req,res) {
    console.log("the request : ", req.body)
    
    try {
        const id = req.body.id;
        const address = req.body.address;
        const uri = await getTokenIdUri(address, id);
        if (uri) return res.status(200).send({tokenUri:uri})
        return res.status(204).send({message: "No token Uri found"})
    } catch (err) {
        console.error(err);
        res.status(500).send({message: " erreur while getting token Uri"})
    }
}



// @desc refresh the dataBase with all Nfts that have been minted ever 
// @route get /nfts/refresh
async function refreshNftsDataBase(req, res) { 
    //@todo
}


module.exports = { getUserNfts, refreshNftsDataBase, getRefreshedTokenUri };