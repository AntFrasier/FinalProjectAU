import React from 'react'
import UserComponent from '../component/UserComponent';

const User = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("user in the user page : ", user);

    if(user.role) {
        switch (user.role) {
            case 1001 : return <UserComponent user={user}/>
                
    
            default : return (<div>DEFAULT</div>)
        }
    } else return (
        <div>Not connected</div>
    )
  
}

export default User;