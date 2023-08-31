import { List, ListItem, Button, Box, Tr, Td, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

const PartnersList = ({setRefresh, partners, connectedUser, backendUrl}) => {
    //const [partners, setPartners] = useState([]);
    const [addressToDelete, setAddressTodelete] = useState();
    const [modal, setModal] = useState(false);
  
    // useEffect(()=>{
    //     const abortController = new AbortController(); // finish the protect call to api
    //     async function getPartners (){ 
    //         console.log("start querying");
    //         try {
    //             const response = await axios.get(backendUrl + "/user/partners")
    //             console.log("res from partnerList axios call" , response)
    //             setPartners(response.data);
    //         } catch (err) {
    //             alert(err);
    //         }
    //     }

    //     getPartners();

    // }, [refresh])

    const deletePartner = async (address) => {
         try {
                const response = await axios.delete(backendUrl + `/user/${address}`)
                console.log("res from partnerList axios DELETE call" , response)
                setModal(false);
                setRefresh(true);

            } catch (err) {
                setModal(false);
                alert(err);
            }
    }
    const manageDelete = (address) => {
        setAddressTodelete(address);
        setModal(true);
    }

    const Modal = () => {
        return (
            <Box position={"absolute"} zIndex={100} top={0} left={0} w={"100vw"} h={"100vh"} bg={"bgTrans"} display={"flex"} justifyContent={"center"} alignContent={"center"} alignItems={"center"}>
            <Box w={"250px"} gap={5} h={"250px"} bg={"gray.800"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignContent={"center"} alignItems={"center"}>
                <Box textColor={"white"} gap={3} p={5}>
                    Atention Effacer une entrée est irreversible ! Toutes les données de cet utilisateur seront effacées !
                </Box>
                <Flex gap={3} justifySelf={"flex-end"}>
                    <Button textColor={"red"} onClick={ () => deletePartner(addressToDelete)}> delete</Button>
                    <Button onClick={ () => setModal(false)}> cancel</Button>
                </Flex>
            </Box>
            </Box>
        )
    }
    if(partners) {
    return (
        <>
                
                {partners?.map( partner => 
                <Tr>
                    <Td>{partner.name} </Td>
                    <Td>{partner.address}</Td>
                    <Td>{partner.webSite}</Td>
                    <Td>{partner.role}</Td>
                    <Td>{connectedUser?.role == 3003 ? <Button onClick={ () => manageDelete(partner.address)}> delete</Button> : null}</Td>
                </Tr>
                ) }
            {modal? <Modal /> : null }
        </>
    )}
    else {return (<div>Waiting loading</div>)}
}

export default PartnersList;