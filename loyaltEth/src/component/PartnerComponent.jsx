import { Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import Campaigns from './Campaigns';
import useAuth from '../hooks/useAuth';

const PartnerComponent = () => {
  const { auth } = useAuth();
  const user = auth?.user;

  return (
    <>
      <Flex direction={"column"}>
          <Heading as={"h2"}> Partner administration :</Heading>
          <Heading mt={5} as={"h3"}>Welcome {user?.name}</Heading>
          <Text>{user?.webSite}</Text>    
          
      </Flex>
      <Flex direction={"column"}>
        <Heading as={"h2"}>Your campaigns :</Heading>
        <Campaigns />

      </Flex>
    </>
  )
}

export default PartnerComponent;