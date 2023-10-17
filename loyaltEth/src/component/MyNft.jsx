import React from 'react';
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { Button, Flex } from '@chakra-ui/react';
import contracts from "../artifacts/deployedContracts"


const MyNft = ({nft, setRefresh}) => {
    console.log(nft)
    // const {config, isError, error} = usePrepareContractWrite({
        
    //     args:[BigInt(nft.tokenId)]
    //   })
    
      const {data, write} = useContractWrite({
        address: nft.partnerVendorAddress,
        abi: contracts.PartnerVendorContract.abi,
        functionName:"withdraw",
        args:[BigInt(nft.tokenId)],
        onSuccess (data) {
          console.log("tx success")
          setRefresh(!prev)
        }
      })
    
      const {isFetched, isSuccess} = useWaitForTransaction(data?.hash)
    
      const handleWithDraw = () => {
        console.log(isError);
        console.log(error);
        write();
      }

  return (
    <Flex key={nft.address +  nft.id} border={"1px solid"} borderRadius={"10px"} padding={10} margin={10} direction={"column"}>
            <img src={nft.rawMetadata?.image} />
            {nft.userWithdrawable && nft.tokenActive? <Button onClick={() => write()}>Withdraw</Button> : null}
          </Flex>
  )
}

export default MyNft