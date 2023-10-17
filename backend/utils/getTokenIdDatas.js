const {Contract} = require("ethers");
const contracts = require("../config/deployedContracts");
const {myProvider} = require("./myProvier");


const decodeBase64 = (str) => Buffer.from(str, 'base64').toString('binary'); 

const getTokenIdDatas = async (nftAddress, id) => {
    const nftContract = new Contract (
        nftAddress,
        contracts.LoyaltEthCards.abi,
        myProvider,
    )
    const uri = await nftContract.getTokenURI(id)
    const tokenUsed = await nftContract.getTokenUsedById(id)
    const tokenActive = await nftContract.tokenIsActive(id)
    const tokenDeadLine = await nftContract.getTokenDeadLine(id)
    const tokenIdMetadata = await nftContract.tokenIdMetadata(id) 
    const partnerVendorAddress = await nftContract.partnerVendorAddress() 
    //@todo should have await promise.all but not seems working here ..
    return {
        uri : JSON.parse(decodeBase64(uri.substring(29))).image,
        tokenUsed,
        tokenActive, 
        tokenDeadLine,
        tokenIdMetadata,
        partnerVendorAddress
    }
}

module.exports= { getTokenIdDatas }