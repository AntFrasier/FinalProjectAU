import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Box, Button, Flex, FormControl, InputGroup, FormLabel, Input, Text, Heading } from '@chakra-ui/react';
import { useBalance, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi';

const Campaign = ({campaign, contractsData}) => {
    const {id} = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [_to, setTo] =useState("0xB810b728E44df56eAf4Da93DDd08168B3660753f");
    const [_required, setRequired] = useState(10);
    const [_url, setUrl] = useState("");
    const [_validity, setValidity] = useState(365);
    const [_percent, setPercent] = useState(10);
    const [myBalance, setMyBalance] = useState(0);
    const [NftSupply, setNftSupply] = useState(0);
    // const [campaign, setCampaign] = useState(null);

    const {data:owner, isSuccess: readSuccess} = useContractRead({
        address: campaign?.contractAddress,
        abi: contractsData.PartnerVendorContract.abi,
        functionName: 'owner',
    })

    const supply = useContractRead({
        address: campaign?.NFTContractAddress,
        abi: contractsData.LoyaltEthCards.abi,
        functionName: 'totalSupply',
        onSuccess(data){ setNftSupply (Number(data))},
    })
    
    const balance = useBalance({
        address: campaign?.contractAddress,
        onSuccess(data){ setMyBalance( data.formatted)},
      })

    const { config:mintConfig } = usePrepareContractWrite({
        address: campaign?.NFTContractAddress,
        abi: contractsData.LoyaltEthCards.abi,
        functionName: 'mint',
        args:[
            _to, //address to (that will receiv the NFT)
            _required, //the n umber of times that the customer have to interact with the contract
            _url, //url of the service proposed
            _validity, //numbers of days before the nft expire
            _percent, //the percentage cashBack proposed
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
                <Text>Total Nfts : {NftSupply}</Text>
                <Text>Balance : {myBalance} Ξ</Text>
                <FormControl maxW={350} alignSelf={"center"}>
                    <FormLabel>Mint to ?</FormLabel>
                    <Input 
                        placeholder='Recipient address' 
                        type='text' 
                        value={_to}
                        onChange ={ (e) =>setTo(e.target.value) }
                    />
                    {/* <FormHelperText>This name will be show to users.</FormHelperText> */}
                    <FormLabel>Actions required</FormLabel>
                    <InputGroup>
                        <Input 
                            placeholder='Number of actions needed' 
                            type='number'
                            value={_required}
                            onChange ={ (e) =>setRequired(e.target.value) }
                        />
                    </InputGroup>
                    <FormLabel>Service url</FormLabel>
                    <InputGroup>
                        <Input 
                            placeholder='Service Url' 
                            type='text'
                            value={_url}
                            onChange ={ (e) =>setUrl(e.target.value) }
                        />
                    </InputGroup>
                    <FormLabel>Validity</FormLabel>
                    <InputGroup>
                        <Input 
                            placeholder='Numbers of days of validity' 
                            type='number'
                            value={_validity}
                            onChange ={ (e) =>setValidity(e.target.value) }
                        />
                    </InputGroup>
                    <FormLabel>CashBack</FormLabel>
                    <InputGroup>
                        <Input 
                            placeholder='Percentage of cash Back' 
                            type='number'
                            value={_percent}
                            onChange ={ (e) =>setPercent(e.target.value) }
                        />
                    </InputGroup>
                    <Text>Please make sure the wallet that is connected, will be the wallet wher you'll receive the funds from customers</Text>
                    {/* <FormHelperText>This name will be show to users.</FormHelperText> */}
                    {/* <FormLabel>Connect your Wallet : </FormLabel> */}
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