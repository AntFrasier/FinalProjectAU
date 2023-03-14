import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <Flex flexDirection={"column"} alignContent="center" justifyContent="center" alignItems={"center"}>
      <div>
        <Heading as={"h3"} mb={35}>Sign up As :</Heading>
      </div>
      <div>
        <Button mr={35}>
          <Link to="/register/user">An User</Link>
        </Button>
        <Button>
          <Link to="/register/partner">A Partner</Link>
        </Button>
      </div>
    </Flex>
  )
}

export default Register;