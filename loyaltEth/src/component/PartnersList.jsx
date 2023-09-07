import { List, ListItem, Button, Box, Tr, Td, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
//import axios from "../api/axios";

const PartnersList = ({setRefresh, partners, connectedUser, backendUrl}) => {
    const [addressToDelete, setAddressTodelete] = useState();
    const [modal, setModal] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    
    const deletePartner = async (address) => {
         try {
                const response = await axiosPrivate.delete(`/user/${address}`)
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

    useEffect(()=>{
        console.log("partners : ", partners)
    },[])

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
                <Tr key={partner._id}>
                    <Td key={`${partner._id}name`}>{partner.name} </Td>
                    <Td key={`${partner._id}add`}>{partner.address}</Td>
                    <Td key={`${partner._id}web`}>{partner.webSite}</Td>
                    <Td key={`${partner._id}role`}>{partner.role}</Td>
                    <Td key={`${partner._id}delete`}>{connectedUser?.role == 3003 ? <Button onClick={ () => manageDelete(partner.address)}> delete</Button> : null}</Td>
                </Tr>
                ) }
            {modal? <Modal /> : null }
        </>
    )}
    else {return (<div>Waiting loading</div>)}
}

export default PartnersList;