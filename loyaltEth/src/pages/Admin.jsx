import { Box, Heading, List, Table, Tr, Th, Td, Thead, TableCaption, Tbody, Tfoot, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import PartnersList from '../component/PartnersList';
import UsersList from '../component/UsersList';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';


const Admin = () => {
    const [partners, setPartners] = useState([]);
    const [users, setUsers] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const auth = useAuth();
    const axiosPrivate = useAxiosPrivate();
    //const [connectedUser, setConnectedUser] = useState();
    const connectedUser = auth?.user

   
    useEffect(()=>{
        const abortController = new AbortController(); // finish the protect call to api
        async function getPartners (){ 
            try {
                const response = await axiosPrivate.get("/user/partners")
                const response2 = await axiosPrivate.get("/user/members")
                console.log("res from partnerList axios call" , response)
                setPartners(response.data);
                setUsers(response2.data);
            } catch (err) {
                alert(err);
            }
        }

        getPartners();

        return () => {
            abortController.abort();
        }

    }, [refresh])

   
  return (
    <Box>
        <Heading as={"h2"} mb={"5"}> Administration {connectedUser?.name} :</Heading>
        <Flex>
        <Box bg={"blue.100"}> 
            Menu
        </Box>
        <Box>
            <Heading as={"h3"} mb={"3"}>Partners</Heading>
            <Table key={"id1"} variant='striped'>
                <TableCaption>Manage Partners</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Address</Th>
                        <Th>WebSite</Th>
                        <Th>Role</Th>
                        {connectedUser?.role == 3003? <Th>modifie</Th> : null}
                    </Tr>
                </Thead>
                <Tbody>
                    <PartnersList 
                        setRefresh={setRefresh} 
                        partners={partners} 
                        connectedUser={connectedUser} 
                        
                    />   
                </Tbody>
                <Tfoot>
                    <Tr>
                    <Th>Name</Th>
                        <Th>Address</Th>
                        <Th>WebSite</Th>
                        <Th>Role</Th>
                        {connectedUser?.role == 3003? <Th>modifie</Th> : null}
                    </Tr>
                </Tfoot>
            </Table>
            
            <Heading as={"h3"} mb={"3"}>Users</Heading>
            <Table key={"id2"} variant='striped'>
                <TableCaption>Manage Partners</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Address</Th>
                        <Th>WebSite</Th>
                        <Th>Role</Th>
                        {connectedUser?.role == 3003? <Th>modifie</Th> : null}
                    </Tr>
                </Thead>
                <Tbody>
                    <PartnersList 
                        setRefresh={setRefresh} 
                        partners={users} 
                        connectedUser={connectedUser}
                        
                    />   
                </Tbody>
                <Tfoot>
                    <Tr>
                    <Th>Name</Th>
                        <Th>Address</Th>
                        <Th>WebSite</Th>
                        <Th>Role</Th>
                        {connectedUser?.role == 3003? <Th>modifie</Th> : null}
                    </Tr>
                </Tfoot>
            </Table>
            
            </Box>
            </Flex>

    </Box>
  )
}

export default Admin;