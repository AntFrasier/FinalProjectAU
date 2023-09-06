import { Button, List, ListItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "../api/axios";

const UsersList = ({backendUrl, connectedUser}) => {
    const [users, setUsers] = useState([])
  
    useEffect(()=>{
        const abortController = new AbortController();
        async function getUsers (){ //todo add try catch
            console.log("start querying all users");
            try {
                const response = await axios.get("/user/members")
                console.log("res from usersList axios call" , response)
                setUsers(response.data);
            } catch (err) {
                alert(err);
            }
        }

        getUsers();

    }, [])
    
    return (
        <>
            <List display="flex"  gap={3}>
                {users?.map( user => 
                    <ListItem key={user.id} w={150} bg="grey" m={1} p={5} borderRadius={"lg"}>
                        {user.name} 
                        {user.role} 
                        {connectedUser?.role == 3003 ? <Button> delete</Button> : null}
                    </ListItem>) }
            </List>
        </>
    )
}

export default UsersList;