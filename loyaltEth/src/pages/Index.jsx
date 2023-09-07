import React, { useEffect } from 'react';
import { useAccount, useConnect, useEnsName } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, Spinner } from '@chakra-ui/react';

const Index = ({isConnecting}) => {



    return (
      <Flex flexDir={"row"} alignContent={"center"} justifyContent={"center"} alignItems={"center"}>
        {isConnecting? <Spinner size={"xl"}/> : <p>Please Login</p>}
      </Flex>
    )
}

export default Index