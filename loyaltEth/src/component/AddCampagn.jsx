import { Button } from "@chakra-ui/react";
import { useState } from "react";

const Addcampagn = ({setModal, modal}) => {
   

    return(
        <>
            <Button onClick={ () => setModal(!modal)}>Add</Button>
        </>
    )
}

export default Addcampagn;