import { Box, Heading } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import PartnersList from '../component/PartnersList';

const Partners = ({backendUrl}) => {

  useEffect(()=> {
    const abortController = new AbortController();
    try {

    } catch {

    }

    return ( ()=> {
      abortController.abort();
    })
  },[])
  return (
    <Box>
        <Heading as={"h2"}> Here are our amazing parters :</Heading>
        <PartnersList backendUrl={backendUrl} />
    </Box>
  )
}

export default Partners