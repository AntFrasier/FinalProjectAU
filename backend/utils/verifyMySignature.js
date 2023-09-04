const ethers = require("ethers");
const User = require("../model/User");

// const getNonce = async (userAdress) => {
//     const exiting = User.findOne({address : userAdress}).exec()
//     return "/0"
//   };


const verifyMySignature = async (address, signature, nonce) => {

    const trustedMessage = ( "Login to LoyaltEth/" + address + "/" +  nonce );
    const signingAddress = ethers.verifyMessage(trustedMessage, signature);
    
    console.log("in verify signature" , signingAddress, "the nonce :",  nonce)
    if (signingAddress == address) { return true}
    else return false

  };
  
  module.exports = {verifyMySignature};