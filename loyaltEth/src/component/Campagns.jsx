import { List, ListItem } from "@chakra-ui/react";
import { useState } from "react";
import Addcampagn from "./AddCampagn";
import CreateCampagnModal from "./CreateCampagnModal";

const Campaigns = () => {
    const [campagns, setCampagns] = useState(null);
    const [modal, setModal] = useState(false);

    console.log(campagns)
    return ( 
        <>
            <List display="flex" gap={3}>
                {campagns === null ? ( 
                    <ListItem>no Campagn</ListItem> 
                ) : (
                    campagns?.map( campagn => <ListItem key={campagn.id}>{campagn.name}</ListItem>)
                ) 
                }
                <ListItem><Addcampagn setModal={setModal} modal={modal}/></ListItem>
            </List>
            {modal? <CreateCampagnModal setModal={setModal} /> : null}
        </>
    )
}

export default Campaigns;