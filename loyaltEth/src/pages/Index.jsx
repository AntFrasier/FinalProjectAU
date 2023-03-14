import { Box } from '@chakra-ui/react';
import React from 'react';
import User from './User';
import Register from './Register';
import { useAccount, useConnect, useEnsName } from 'wagmi';
import { useNavigate } from 'react-router-dom';

const Index = ({registred}) => {
  const { address, isConnected } = useAccount()
  const navigate = useNavigate()

  if (isConnected) { 
    if (registred) {
      navigate("/user")
      } else {
      navigate("/register")
    }}
  else {
    return (
      <div>
      Please Login
      </div>)}
}

export default Index