import { List, ListItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

const PartnersList = ({backendUrl}) => {
    const [partners, setPartners] = useState([])
    async function getPartners (){ //todo add try catch
        const response = await axios.get(backendUrl + "/user/members")
        console.log("res from partnerList axios call" , response)
        setPartners(response.data);
    }
    useEffect(()=>{
        getPartners();

    }, [])
    
    return (
        <>
            <List display="flex" gap={3}>
                {partners?.map( partner => <ListItem w={150} bg="grey" m={1} p={5} borderRadius={"lg"}>{partner.name}</ListItem>) }
            </List>
        </>
    )
}

export default PartnersList;