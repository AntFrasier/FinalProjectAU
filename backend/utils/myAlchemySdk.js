require("dotenv").config()
const { Alchemy, Network } = require("alchemy-sdk");

const apiKey = process.env.ALCHEMY_API_KEY;
const network = Network.ETH_GOERLI;

const alchemy = new Alchemy({apiKey, network})
    
module.exports = {alchemy};