import { List, ListItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

const PartnersList = ({backendUrl}) => {
    const [partners, setPartners] = useState([])
    async function getPartners (){ //todo add try catch
        const response = await axios.get(backendUrl + "/user/partners")
        console.log("res from partnerList axios call" , response)
        setPartners(response.data);
    }
    useEffect(()=>{
        getPartners();

    }, [])
    
    return (
        <>
            <List>
                {partners?.map( partner => <ListItem>{partner.name}</ListItem>) }
            </List>
        </>
    )
}

export default PartnersList;