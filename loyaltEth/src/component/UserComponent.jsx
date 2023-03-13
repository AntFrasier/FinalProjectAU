import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'

const UserComponent = ({user}) => {
  return (
    <Flex>
        <Heading as={"h2"}> UserComponent :</Heading>
        <Heading as={"h3"}>Welcome {user.name}</Heading>
        
    </Flex>
  )
}

export default UserComponent