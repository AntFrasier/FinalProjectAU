import { Button, List, ListItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
//import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const UsersList = ({backendUrl, connectedUser}) => {
    const [users, setUsers] = useState([])
    const axiosPrivate = useAxiosPrivate();
  
    useEffect(()=>{
        const abortController = new AbortController();
        async function getUsers (){ //todo add try catch
            console.log("start querying all users");
            try {
                const response = await axiosPrivate.get("/user/members")
                console.log("res from usersList axios call" , response)
                setUsers(response.data);
            } catch (err) {
                alert(err);
            }
        }

        getUsers();
        return () => abortController.abort
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