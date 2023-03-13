import { Box } from '@chakra-ui/react';
import React from 'react';
import Register from './Register';
import { useAccount, useConnect, useEnsName } from 'wagmi';

const Index = () => {
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  if (isConnected) {
    return (
      <div>
        Connected to {ensName ?? address}
      </div>)}
  else {
    return (
      <Box>
          <Register />
      </Box>
   )}
}

export default Index