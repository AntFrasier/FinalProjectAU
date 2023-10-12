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
    Textarea,
  } from '@chakra-ui/react';
// import { useContractRead , useClient } from 'wagmi';
import { useEffect } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import useAxiosPrivate from "../hooks/useAxiosPrivate";



const CreateCampaignModal = ({setModal, contractsData, partnerAddress}) => {
    const [campaignName,setCampaignName] =useState("");
    const [website,setWebsite] =useState("");
    const [description,setDescription] =useState("");
    const [required, setRequired] = useState();
    const [validity, setValidity] = useState();
    const [percent, setPercent] = useState();
    const [isMining, setIsMining] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const {address, isConnected} = useAccount();

    /*@Params
    *required: number of iteration before the reward can be withdraw
    * url: the url of the service that is proposed by the partner
    * validity: duration of validity 'in days' (if the card is not full befor the validity, the partner can withdraw the reward, if the card is full befor the deadLine the customer can withdraw his reward)
    * percent: the percentage of cashBack that you get if you use _required times before the deadLine
    */
    const { config, isError } = usePrepareContractWrite({
        address: contractsData.LoyaltEthFactory.address,
        abi: contractsData.LoyaltEthFactory.abi,
        functionName: 'CreateNewLoyaltEthProgramme',
        args:[
            required,
            website,
            validity,
            percent,
        ],
        
    })
    const createCampaignContracts = useContractWrite(config);

    async function registerCampaign(){
        console.log("sending the post request :" ,address, campaignName, website)
        try{

         await axiosPrivate.post("/campaign",{
            user:{
                address: address,
            },
            campaign:{
                name:campaignName,
                website: "https://" + website,
                required:required,
                validity:validity,
                percent:percent,
                description:description,

            }
         }).then((response) => {
            console.log("campaign registred in the dB ! ",response)
            
         })
        } catch (err) {
            console.log("there was an error while register the campaign in DB : ",err)
        } finally {
            setModal(false);
            setIsMining(false);
        }
    }

    const handleTx = async () => {
        if (createCampaignContracts.writeAsync) {
            try {
              setIsMining(true);
              await createCampaignContracts.writeAsync()
            //   console.log(createCampaignContracts.data)  
            } catch (e) {
              const message = e;
              console.error(message);
              setIsMining(false);
            } 
        } else {
            console.error("Contract writer error. Try again.");
        }
    }

    const waitTx = useWaitForTransaction({ //wait for 1 validation can be set to more with confiramtions: x
        hash: createCampaignContracts?.data?.hash
    })

    useEffect(()=> {
       if(waitTx.isSuccess) {
           console.log(waitTx);
           registerCampaign();
           
       }
       if(waitTx.isError) {
           console.log(waitTx.error)
           setIsMining(false);
       }
    },[waitTx.isSuccess, waitTx.isError])

    return (
        <>  <Flex position={"fixed"} top={0} w={"100vw"} h={"100vh"} bg={"rgba(0, 0, 0, 0.1)"} backdropFilter={"blur(15px)"} zIndex={999} justifyContent={"center"} alignContent={"center"}>
                <Box  top={10} maxW={"80%"} bg={"white"} p={5} borderRadius={10} h={700} zIndex={1000} position={"relative"}>
                    <Box position={"absolute"} top={2} right={2}>
                        <Button onClick={() => setModal(false)} >X</Button>
                    </Box>
                    
                    <Heading as={"h4"} fontSize={"1.75rem"} paddingTop={17}>Create Your campagn : </Heading> 
    
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
                        <FormLabel>Describe your campaign</FormLabel>
                        <InputGroup>
                            
                            <Textarea 
                                placeholder='Describe your service' 
                                type="text"
                                value={description}
                                onChange ={ (e) =>setDescription(e.target.value) }
                            />
                        </InputGroup>
                        <FormLabel>Actions required</FormLabel>
                        <InputGroup>
                            <Input 
                                placeholder='Number of actions needed' 
                                type='number'
                                value={required}
                                onChange ={ (e) =>setRequired(e.target.value) }
                            />
                        </InputGroup>
                        <FormLabel>Validity</FormLabel>
                        <InputGroup>
                            <Input 
                                placeholder='Numbers of days of validity' 
                                type='number'
                                value={validity}
                                onChange ={ (e) =>setValidity(e.target.value) }
                            />
                        </InputGroup>
                        <FormLabel>CashBack</FormLabel>
                        <InputGroup>
                            <Input 
                                placeholder='Percentage of cash Back' 
                                type='number'
                                value={percent}
                                onChange ={ (e) =>setPercent(e.target.value) }
                            />
                        </InputGroup>
                        <Text>Please make sure the wallet that is connected, will be the wallet wher you'll receive the funds from customers</Text>
                        {/* <FormHelperText>This name will be show to users.</FormHelperText> */}
                        {/* <FormLabel>Connect your Wallet : </FormLabel> */}
                        <Flex justifyContent={'space-between'}>
                        {/* <Web3Button icon="hide" balance="hide" />  */}
                        <Button
                            isLoading={isMining}
                            colorScheme={'teal'} //test color theme
                            mt={35}
                            isDisabled={isError} //@todo add cheking validity ov the info befor sending the write command
                            onClick={() => handleTx()}
                        >
                            Create
                        </Button>
                        </Flex>
                    </FormControl>
                {isMining && <div>Check Wallet</div>}
                {/* {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>} */}
                </Box>
            </Flex>
        </>
    )
}

export default CreateCampaignModal