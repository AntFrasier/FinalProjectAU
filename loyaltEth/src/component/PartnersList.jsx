import { List, ListItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

const PartnersList = ({backendUrl}) => {
    const [partners, setPartners] = useState([])
  
    useEffect(()=>{
        const abortController = new AbortController();
        async function getPartners (){ //todo add try catch
            console.log("start querying");
            try {
                const response = await axios.get(backendUrl + "/user/partners")
                console.log("res from partnerList axios call" , response)
                setPartners(response.data);
            } catch (err) {
                alert(err);
            }
        }

        getPartners();

    }, [])
    
    return (
        <>
            <List display="flex" gap={3}>
                {partners?.map( partner => <ListItem key={partner.id} w={150} bg="grey" m={1} p={5} borderRadius={"lg"}>{partner.name}</ListItem>) }
            </List>
        </>
    )
}

export default PartnersList;