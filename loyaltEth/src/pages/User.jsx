import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import UserComponent from '../component/UserComponent';

const User = ({user}) => {
    const navigate = useNavigate();
    console.log("user in the user page : ", user);

    useEffect ( () => {
        
        if(user?.role) {
            switch (user.role) {
                case 1001 : 
                    navigate("/user/user");
                    break;
                case 2002 : 
                    navigate("/user/parnter");
                    break;
            }
        }
    },[user])
    
    return (
        <div>Not connected</div>
    )
  
}

export default User;