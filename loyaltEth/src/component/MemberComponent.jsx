import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'

const MemberComponent = ({user}) => {

  return (
    <Flex>
        <Heading as={"h2"}> Member Component :</Heading>
        <Heading as={"h3"}>Welcome {user?.name}</Heading>
        
    </Flex>
  )
}

export default MemberComponent