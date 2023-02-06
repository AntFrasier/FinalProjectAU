import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <Flex alignContent="center" justifyContent="center">
        <Button mr={35}>
            <Link to="partnerRegistration">User</Link>
        </Button>
        <Button>Became a Partner</Button>
    </Flex>
  )
}

export default Register