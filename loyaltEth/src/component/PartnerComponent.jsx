import { Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import Campagns from './Campagns';
import useAuth from '../hooks/useAuth';

const PartnerComponent = () => {
  const { auth } = useAuth();
  const user = auth?.user;

  console.log(user, auth.auth)
  return (
    <>
      <Flex direction={"column"}>
          <Heading as={"h2"}> Partner administration :</Heading>
          <Heading mt={5} as={"h3"}>Welcome {user?.name}</Heading>
          <Text>{user?.webSite}</Text>    
          
      </Flex>
      <Flex direction={"column"}>
        <Heading as={"h2"}>Your campagns :</Heading>
        <Campagns />
      </Flex>
    </>
  )
}

export default PartnerComponent;