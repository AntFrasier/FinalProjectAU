const { getTokenIdDatas } = require("./getTokenIdDatas");
const { alchemy } = require("./myAlchemySdk");
const { myProvider } = require("./myProvier");


/*@params
*
*nftContractsAddresses : an array of contract adresse
*owner: address of the owner
*
*/

const getMyNfts = async (ownerAddress, nftContractsAddresses) => {
    const myNfts = await alchemy.nft.getNftsForOwner(
        ownerAddress,
        {
           contractAddresses: nftContractsAddresses,
        }
        )
    let nfts = myNfts.ownedNfts
    let newNfts = [];
   for (let i=0; i<nfts.length; i++) {
    let metadatas = await getTokenIdDatas(nfts[i].contract.address, nfts[i].tokenId)
    nfts[i].rawMetadata.image = metadatas.uri;
    const blockNumber = await myProvider.getBlockNumber();
    const block = await myProvider.getBlock(blockNumber);
    const currentimestamp = block.timestamp;
    newNfts.push({
        ...nfts[i], 
        userWithdrawable:metadatas.tokenUsed >= metadatas.tokenIdMetadata[1] ? true : false,
        partnerWithdrawable:metadatas.tokenDeadLine < currentimestamp ? true : false, 
        currentimestamp:currentimestamp, 
        tokenActive:metadatas.tokenActive, 
        tokenDeadLine:metadatas.tokenDeadLine.toString(),
        partnerVendorAddress : metadatas.partnerVendorAddress,
        tokenIdMetadata:metadatas.tokenIdMetadata.map ( (a) => a.toString())
    })
   }

    return newNfts;
}


module.exports = { getMyNfts }