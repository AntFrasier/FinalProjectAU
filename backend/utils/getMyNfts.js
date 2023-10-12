const { alchemy } = require("./myAlchemySdk");


/*@params
*
*nftContractsAddresses : an array of contract adresse
*owner: address of the owner
*
*/

const getMyNfts = async (ownerAddress, nftContractsAddresses) => {
    return (
        await alchemy.nft.getNftsForOwner(
         ownerAddress,
         {
            contractAddresses: nftContractsAddresses,
         }
    )
    );
}


module.exports = { getMyNfts }