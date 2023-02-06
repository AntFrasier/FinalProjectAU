import { Web3Button } from "@web3modal/react";
import {
        Box,
        Heading,
        Link,
        Menu,
        MenuItem,
        MenuList,
} from "@chakra-ui/react"

export default function Header(){

return (
    <>  
    <Box w="100%" h="32px" display="flex" alignItems="center" justifyContent="space-between" p={15} mt={15}>
        <Box display="flex" w="80%" alignItems="center">
            <Heading as='h1'>RoyaltEth</Heading>
            <Box display="flex" alignItems="center" placeSelf="flex-end" justifyContent="space-between">
                <Link>
                    About
                </Link>
                <Link>
                    Partners
                </Link>
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