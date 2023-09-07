import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

//const User = ({connectedUser}) => {
const User = () => {
    const navigate = useNavigate();
    
    const auth = useAuth();

    useEffect ( () => {
        console.log("user in the user page : ", auth.auth.user);
        console.log(auth.auth)
        const connectedUser = auth.auth.user;
        if(connectedUser?.role) {
            switch (connectedUser.role) {
                case 1001 : 
                    navigate("/user/member");
                    break;
                case 2002 : 
                    navigate("/user/partner");
                    break;
                case 3003 : 
                    navigate("/user/admin");
                    break;
            }
        }
    },[auth])
    
    return (
        <div>Not connected</div>
    )
  
}

export default User;