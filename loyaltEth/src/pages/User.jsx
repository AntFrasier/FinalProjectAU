import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import UserComponent from '../component/MemberComponent';

const User = ({connectedUser}) => {
    const navigate = useNavigate();
    console.log("user in the user page : ", connectedUser);

    useEffect ( () => {
        
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
    },[connectedUser])
    
    return (
        <div>Not connected</div>
    )
  
}

export default User;