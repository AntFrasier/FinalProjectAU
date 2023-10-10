import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Box, Button, Flex, FormControl, InputGroup, FormLabel, Input, Text, Heading } from '@chakra-ui/react';
import { useBalance, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi';
/*@todo
*
* Add the Nfts that are expired and can be withdraw bye the partner
*
*/
const Campaign = ({campaign, contractsData}) => {
    const {id} = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [_to, setTo] =useState("0xB810b728E44df56eAf4Da93DDd08168B3660753f");
    const [myBalance, setMyBalance] = useState(0);
    const [NftSupply, setNftSupply] = useState(0);
    // const [campaign, setCampaign] = useState(null);

    const {data:owner, isSuccess: readSuccess} = useContractRead({
        address: campaign?.vendorContractAddress,
        abi: contractsData.PartnerVendorContract.abi,
        functionName: 'owner',
    })

    const supply = useContractRead({
        address: campaign?.nFTContractAddress,
        abi: contractsData.LoyaltEthCards.abi,
        functionName: 'totalSupply',
        onSuccess(data){ setNftSupply (Number(data))},
    })
    
    const balance = useBalance({
        address: campaign?.vendorContractAddress,
        onSuccess(data){ setMyBalance( data.formatted)},
      })

    const { config:mintConfig } = usePrepareContractWrite({
        address: campaign?.nFTContractAddress,
        abi: contractsData.LoyaltEthCards.abi,
        functionName: 'mint',
        args:[
            _to, //address to (that will receiv the NFT)
        ]
    })
    const { data, isLoading, isSuccess, write, isError, error } = useContractWrite(mintConfig);

  return (
    <div>

        {campaign ? (
            <Flex direction={"column"} maxW={550} gap={5} border={"solid 1px"} borderRadius={"10px"} padding={10} margin={10}>
                <Flex direction={"row"} justify={"space-between"} alignItems={"flex-end"}>
                    <Heading as={"h4"} >
                        {campaign.name}
                    </Heading>
                    <a href={`https://${campaign.website}`} target='_blank' rel='nofollow no referre noopener'>
                        {campaign.website}
                    </a>
                </Flex>
                <Flex direction={"row"} justify={"space-between"}>
                    <Box>
                        <Text>Total Nfts : {NftSupply}</Text>
                        <Text>Balance : {myBalance} Ξ</Text>
                    </Box>
                    <Box>
                        <Text>Validity : {campaign?.validity} day{campaign?.validity > 1 ? "s" : ""}</Text>
                        <Text>Number of use required : {campaign?.required}</Text>
                    </Box>
                </Flex>
                <FormControl maxW={350} alignSelf={"center"}>
                    <FormLabel>Mint to ?</FormLabel>
                    <Input 
                        placeholder='Recipient address' 
                        type='text' 
                        value={_to}
                        onChange ={ (e) =>setTo(e.target.value) }
                    />
                    <Flex justifyContent={'space-between'}>
                <Button
                        isLoading={isLoading}
                        colorScheme={'teal'} //test color theme
                        mt={35}
                        disabled={!write}
                         onClick={() => write?.()}
                    >
                        Mint
                    </Button>
                    </Flex>
                    </FormControl>
            </Flex>
            ):(
            null)}
    </div>
  )
}

export default Campaign