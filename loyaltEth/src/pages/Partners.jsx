import { Box, Heading, Table, Tr, Th, Thead, TableCaption, Tbody, Tfoot } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import PartnersList from '../component/PartnersList';
import axios from '../api/axios';

const Partners = () => {
  const [partners, setPartners] = useState([]);

  useEffect(()=> {
    const abortController = new AbortController();
    const getPartners = async () => {
      try {
        await axios.get("/partners").then( (response) => {
          if (response.status === 200) {
            console.log(response)
            setPartners(response.data)
          } 
        }
        )
      } catch  (err) {
        alert(err);
      }
    }

    getPartners();
    return ( ()=> {
      abortController.abort();
    })
  },[])
  return (
    <Box>
        <Heading as={"h2"}> Here are our amazing parters :</Heading>
        <Table key={"id1"} variant='striped'>
                <TableCaption>Manage Partners</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Address</Th>
                        <Th>WebSite</Th>
                        <Th>Role</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <PartnersList partners={partners} />   
                </Tbody>
                <Tfoot>
                    <Tr>
                    <Th>Name</Th>
                        <Th>Address</Th>
                        <Th>WebSite</Th>
                        <Th>Role</Th>
                    </Tr>
                </Tfoot>
            </Table>
    </Box>
  )
}

export default Partners