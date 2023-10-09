import { useState } from "react";
import {
    Flex, 
    Box,
    Heading, 
    Input, 
    Text,
    FormControl,
    FormLabel,
    InputGroup,
    InputLeftAddon,
    Button,
  } from '@chakra-ui/react';
// import { useContractRead , useClient } from 'wagmi';
import { useEffect } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import useAxiosPrivate from "../hooks/useAxiosPrivate";



const CreateCampaignModal = ({setModal, contractsData, partnerAddress}) => {
    const [campaignName,setCampaignName] =useState("");
    const [website,setWebsite] =useState("");
    const axiosPrivate = useAxiosPrivate();
    const {address, isConnected} = useAccount();


    const { config } = usePrepareContractWrite({
        address: contractsData.LoyaltEthFactory.address,
        abi: contractsData.LoyaltEthFactory.abi,
        functionName: 'CreateNewLoyaltEthProgramme',
    })
    const { data, isLoading, isSuccess, write, isError, error } = useContractWrite(config);

    useEffect(()=> {
        async function registerCampaign(){
            console.log("sending the post request :" ,address, campaignName, website)
            try{

             await axiosPrivate.post("/campaign",{
                user:{
                    address: address,
                },
                campaign:{
                    name:campaignName,
                    website:website
                }
             }).then((response) => {
                console.log(response)
                setModal(false);
             })
            } catch (err) {
                console.log("there was an error while register the campaign in DB : ",err)
            }
        }
        const controller =new AbortController();
        if (isSuccess&&isConnected){
            registerCampaign();
        }
        return () => controller.abort(); 
    },[isLoading,isSuccess])

    return (
        <>  <Flex position={"fixed"} top={0} w={"100vw"} h={"100vh"} bg={"rgba(0, 0, 0, 0.1)"} backdropFilter={"blur(15px)"} zIndex={999} justifyContent={"center"} alignContent={"center"}>
            <Box position={"fixed"} top={10} w={"80%"} bg={"white"} p={5} borderRadius={10} h={650} zIndex={1000}>
                <Flex direction={"row-reverse"} justifyContent={"space-between"}>
                    <Button placeSelf={"reverse"} justifySelf={"flex-end"} alignSelf={"flex-end"} onClick={() => setModal(false)} >X</Button>
                    <Heading as={"h4"}>Create Your campagn : </Heading> 
                </Flex>
                <FormControl maxW={350} alignSelf={"center"}>
                    <FormLabel>Compagn/Service Name</FormLabel>
                    <Input 
                        placeholder='Campagn Name' 
                        type='text' 
                        value={campaignName}
                        onChange ={ (e) =>setCampaignName(e.target.value) }
                    />
                    {/* <FormHelperText>This name will be show to users.</FormHelperText> */}
                    <FormLabel>website url</FormLabel>
                    <InputGroup>
                        <InputLeftAddon children='https://' />
                        <Input 
                            placeholder='Service Promoted web site' 
                            type={'url'}
                            value={website}
                            onChange ={ (e) =>setWebsite(e.target.value) }
                        />
                    </InputGroup>
                    <Text>Please make sure the wallet that is connected, will be the wallet wher you'll receive the funds from customers</Text>
                    {/* <FormHelperText>This name will be show to users.</FormHelperText> */}
                    {/* <FormLabel>Connect your Wallet : </FormLabel> */}
                    <Flex justifyContent={'space-between'}>
                    {/* <Web3Button icon="hide" balance="hide" />  */}
                    <Button
                        isLoading={isLoading}
                        colorScheme={'teal'} //test color theme
                        mt={35}
                        disabled={!write}
                         onClick={() => write?.()}
                    >
                        Create
                    </Button>
                    </Flex>
                </FormControl>
            {isLoading && <div>Check Wallet</div>}
            {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
            </Box>
            </Flex>
        </>
    )
}

export default CreateCampaignModal