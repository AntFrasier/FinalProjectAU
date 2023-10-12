const {Contract} = require("ethers");
const contracts = require("../config/deployedContracts");
require("dotenv").config()
const {myProvider} = require("./myProvier");


//@desc return an array of all the contracts of an owner from the blockchain
// @param : address of the owner 
const getPartnerCampaigns = async(add) => {
    const loyaltEthFactory = new Contract(
        contracts.LoyaltEthFactory.address,
        contracts.LoyaltEthFactory.abi,
        myProvider
    )
    const array = await loyaltEthFactory.getContractArray();
    const indexes = await loyaltEthFactory.getIndexes( add );
    const myContracts = [];
    indexes.map( (i) => console.log(Number(i)))
    for (let i=0; i<indexes.length; i++) {
        myContracts.push([array[0][Number(indexes[i])-1], array[1][Number(indexes[i])-1]])
    }
    return myContracts;
}


// @desc return the last entry of the array of my contracts from the blockchain
// @param : address of the owner 
const getLastPartnerCampaigns = async (add) => {
    const myContracts = await getPartnerCampaigns(add);
    
    if (myContracts.length >= 1) return myContracts[myContracts.length - 1 ];
    return null;
}


module.exports = { getPartnerCampaigns, getLastPartnerCampaigns };