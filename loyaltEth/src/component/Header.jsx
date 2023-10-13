import { Web3Button } from "@web3modal/react";
import { Box, Heading } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import React from "react";
import useAuth from "../hooks/useAuth";


export default function Header({registred}){
    const {auth} = useAuth();

return (
    <>  
    <Box w="100%" h="32px" display="flex" alignItems="center" justifyContent="space-between" p={15} mt={15} mb={50} pb={35} boxShadow = "0px 5px 1px 1px rgba(0, 0, 0, .02)">
        <Box display="flex" w="80%" alignItems="center">
            <Link to="/home">
                <Heading as='h1'>LoyaltEth</Heading>
            </Link>
            <Box display="flex" alignItems="center" justifyContent="space-between" gap={10} pl={10}>
                <Link to="/campaigns" cursor="pointer">
                    Campaigns
                </Link>
                <Link to="/partners" cursor="pointer">
                    Partners
                </Link>
                {auth?.user?.role ? (<Link to="/user" cursor="pointer">
                    Dashboard
                </Link> ) : null }
                
            </Box>
        </Box>
        <Web3Button 
        icon="hide"
        balance="show"
        />
    </Box>
    </>
)
}