import React, { useEffect, useState } from 'react';
import {
  Flex, 
  Heading, 
  Input, 
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Button,
} from '@chakra-ui/react';
import { Web3Button } from "@web3modal/react";
//import axios from "../api/axios";
import { useAccount, useWalletClient, useSignMessage  } from 'wagmi';
import { useNavigate } from "react-router-dom";
import axios from '../api/axios';



const PartnerRegistration = ({login}) => {
  const navigate = useNavigate();
  const [active, setActive] = useState('false');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState();
  const [webSite, setWebSite] = useState();
  const {address, isConnected} = useAccount();
  const { data: signer } = useWalletClient();
  const { data, isError, isLoading, isSuccess, signMessageAsync } = useSignMessage()
 



  async function handleRegister() {
    if (isConnected) {
      console.log("the signer is : ",signer)
      
    // const signMessage = await signer.signMessage(`${name} ${address}`);
    // const signedMessage =  await signMessageAsync({message : `${name} ${address}`}); //todo mofi to accord to signature verification with nonce
    // console.log(signedMessage);
    try {
      // await AccordionButton.
      await axios.post("/register", {
        user : { name : name,
                 address: address,
                 role:2002,
                 website: "https://" + webSite,
                 //signature: signedMessage,
      }}).then(response => {
        console.log(response);
        login(address)
      })
      
    } catch(err){
      console.log(err)
      switch (err.response.status) {
        case 409 : //todo remove that
          console.log(err.response.data.data)
          localStorage.setItem("user", JSON.stringify(err.response.data.data))
          navigate("/user");
          break;
        default : console.log("error : ", err );
      }
    }
  }
  else { alert("Please connect your wallet first")}
  }

  useEffect ( () => {
      // console.log(provider.getSigner())
  }, [])
  
   return (
    <Flex flexDirection={'column'}>
      <Heading as="h3" mt={15}>Partner Registration :</Heading>
      <Text pt={50}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis quis ad porro deserunt voluptatem voluptatum numquam delectus rem odit nisi, cumque qui sunt quibusdam? Cupiditate iste molestiae obcaecati maiores quaerat.</Text>
      <FormControl maxW={350} alignSelf={"center"}>
        <FormLabel>Companie/Service Name</FormLabel>
        <Input 
          placeholder='Service Name' 
          type='text' 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* <FormHelperText>This name will be show to users.</FormHelperText> */}
        <FormLabel>website url</FormLabel>
        <InputGroup>
          <InputLeftAddon children='https://' />
          <Input 
            placeholder='mysite' 
            type={'url'}
            value={webSite}
            onChange ={ (e) => setWebSite(e.target.value)}
          />
       </InputGroup>
        {/* <FormHelperText>This name will be show to users.</FormHelperText> */}
        <FormLabel>Connect your Wallet : </FormLabel>
        <Flex justifyContent={'space-between'}>
          <Web3Button icon="hide" balance="hide" /> 
          <Button
            isLoading={loading}
            colorScheme={'teal'} //test color theme
            mt={35}
            disable={active}
            onClick = { () => handleRegister()}
          >
              Register
          </Button>
        </Flex>
      </FormControl>
    </Flex>
  )
}

export default PartnerRegistration