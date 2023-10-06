require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

const defaultNetwork = "localhost";
const pKey = process.env.PRIVATE_KEY

module.exports = {
  defaultNetwork,
  solidity:
    {
      version: "0.8.17",
      settings: {
        optimizer: {
          enabled: true,
          // https://docs.soliditylang.org/en/latest/using-the-compiler.html#optimizer-options
          runs: 200,
        },
        viaIR: true, //added to avoid compilation error Stack too deep
      },
    
    },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      // accounts: [pKey]
    }
  }
};
