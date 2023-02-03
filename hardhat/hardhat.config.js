require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

const defaultNetwork = "localhost";
const pKey = process.env.PRIVATE_KEY

module.exports = {
  defaultNetwork,
  solidity: "0.8.17",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      // accounts: [pKey]
    }
  }
};
