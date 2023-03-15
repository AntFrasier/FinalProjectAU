import { Box, Button, Flex, FormControl, Heading } from "@chakra-ui/react";

const CreateCampaignModal = ({setModal}) => {
    return (
        <>  <Flex position={"fixed"} top={0} w={"100vw"} h={"100vh"} bg={"rgba(0, 0, 0, 0.1)"} backdropFilter={"blur(15px)"} zIndex={999} justifyContent={"center"} alignContent={"center"}>
            <Box position={"fixed"} top={10} w={"80%"} bg={"white"} p={5} borderRadius={10} h={650} zIndex={1000}>
                <Flex direction={"row-reverse"} justifyContent={"space-between"}>
                    <Button placeSelf={"reverse"} justifySelf={"flex-end"} alignSelf={"flex-end"} onClick={() => setModal(false)} >X</Button>
                    <Heading as={"h4"}>Create Your campagn : </Heading> 
                </Flex>
                <FormControl>
                    
                </FormControl>
            </Box>
            </Flex>
        </>
    )
}

export default CreateCampaignModal