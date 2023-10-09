import { useState } from "react";
import {
    Flex, 
    Heading, 
    Input, 
    Text,
    FormControl,
    FormLabel,
    InputGroup,
    InputLeftAddon,
    Button,
  } from '@chakra-ui/react';

const Addcampaign = ({setModal, modal}) => {

   

    return(
        <>    
        <Button onClick={ () => setModal(!modal)}>Add</Button>
        </>
    )
}

export default Addcampaign;