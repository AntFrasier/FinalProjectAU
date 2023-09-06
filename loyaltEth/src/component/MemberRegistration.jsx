import { Flex, Heading, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  InputLeftAddon,
  Button,
} from '@chakra-ui/react';
import { Web3Button } from "@web3modal/react";
import axios from "../api/axios";
import { useAccount, useWalletClient, useSignMessage } from 'wagmi';
import { useNavigate } from "react-router-dom";



const MemberRegistration = ({backendUrl}) => {
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
    const signature = await signMessageAsync({ message :`${name} ${address}`});
    console.log(signature);
    try {
      // await AccordionButton.
      await axios.post("/user", {
        user : { name : name,
                 address: address,
                 role:1001,
                 website: "",
                 signature: signature,
      }}).then(response => {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        navigate("/user");
      })
      
    } catch(err){
      switch (err.response.status) {
        case 409 : 
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
      <Heading as="h3" mt={15}>Member Registration :</Heading>
      <Text pt={50}>Welcome to the member Resitration page. You can register your self to see your accumuluted rewards using the LoyaltEth services !</Text>
      <FormControl maxW={350} alignSelf={"center"}>
        <FormLabel>Your Name</FormLabel>
        <Input 
          placeholder='Your Name' 
          type='text' 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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

export default MemberRegistration