//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./LoyaltEthCards.sol";
import "./PartnerVendorContract.sol";
/**
 * A Factory smart contract that create the NFT rewards card contreact and the intermediaire paiement smart contract.
 * This has not be audited, this smart contract is only for a education purpose ! Please DO NOT USE IT IN PRODUCTION
 * @author cmaranber.eth
 */

 contract LoyaltEthFactory { //@todo set as iownable ? or Not :p
    LoyaltEthCards[] public LoyaltEthCardsArray;
    PartnerVendorContract[] public PartnerVendorContractArray;
    mapping( address => uint256[]) public ownerIndexes; //keep track an contracts owner index int the array of contracts

    event NewLoyaltEthProgrammeCreated(address LoyaltEthCardsContractAddress, address PartnerVendorContractAddress);

    /*@Params
    *_required: number of iteration before the reward can be withdraw
    * url: the url of the service that is proposed by the partner
    * validity: duration of validity 'in days' (if the card is not full befor the validity, the partner can withdraw the reward, if the card is full befor the deadLine the customer can withdraw his reward)
    * _percent: the percentage of cashBack that you get if you use _required times before the deadLine
    */
      function CreateNewLoyaltEthProgramme(uint8 _required, string memory _url, uint256 _validity, uint8 _percent) external {
        LoyaltEthCards loyaltEthCards = new LoyaltEthCards(address(this), _required, _url, _validity, _percent);
        loyaltEthCards.transferOwnership(msg.sender);
        LoyaltEthCardsArray.push(loyaltEthCards);
        PartnerVendorContract partnerVendorContract = new PartnerVendorContract(address(loyaltEthCards));
        partnerVendorContract.transferOwnership(msg.sender);
        PartnerVendorContractArray.push(partnerVendorContract);
        loyaltEthCards.setParnerVendorAddress(address (partnerVendorContract));
        ownerIndexes[msg.sender].push(LoyaltEthCardsArray.length);
        emit NewLoyaltEthProgrammeCreated(address(loyaltEthCards),address(partnerVendorContract));
   }

   function getContractArray () public view returns( LoyaltEthCards[] memory, PartnerVendorContract[] memory) {
    return (LoyaltEthCardsArray, PartnerVendorContractArray);
   }
   function getIndexes (address _add) public view returns( uint256[] memory) {
    return ownerIndexes[_add];
   }
 }