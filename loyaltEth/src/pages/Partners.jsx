import { Box, Heading } from '@chakra-ui/react'
import React from 'react'
import HeroText from '../component/HeroText'
import PartnersList from '../component/PartnersList'

const Partners = ({backendUrl}) => {
  return (
    <Box>
        <Heading as={"h2"}> Here are our amazing parters :</Heading>
        <PartnersList backendUrl={backendUrl} />
    </Box>
  )
}

export default Partners