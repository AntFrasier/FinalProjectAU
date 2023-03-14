import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'

const PartnerComponent = ({user}) => {
  
  return (
    <Flex>
        <Heading as={"h2"}> Partner Component :</Heading>
        <Heading as={"h3"}>Welcome {user?.name}</Heading>
        
    </Flex>
  )
}

export default PartnerComponent;