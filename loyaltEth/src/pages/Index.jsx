import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import User from './User';
import Register from './Register';
import { useAccount, useConnect, useEnsName } from 'wagmi';
import { useNavigate } from 'react-router-dom';

const Index = ({registred}) => {
  const { address, isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect( () => { //use a use effect ro avoid bad rendering on first render
    if (isConnected) { 
      if (registred) {
        navigate("/user")
        } else {
        navigate("/register")
      }}

  },[isConnected, registred])
 
    return (
      <div>
      Please Login
      </div>)
}

export default Index