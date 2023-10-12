require("dotenv").config()
const { AlchemyProvider } = require("ethers");
const ethers = require("ethers");

const apiKey = process.env.ALCHEMY_API_KEY;
const localUrl = 'http://127.0.0.1:8545';

// const myProvider = new ethers.JsonRpcProvider(localUrl);
const myProvider = new AlchemyProvider("goerli", apiKey);
// return new AlchemyProvider("goerli", apiKey);
// const provider = new AlchemyProvider("goerli", apiKey);
    

module.exports = {myProvider};