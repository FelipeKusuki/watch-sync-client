import React from 'react'
import './../App.css';

import Avatar from "@material-ui/core/Avatar";



export default function UserItem({userItem}: any) {
    return (
        <div className="userItem">
            
            <Avatar className="userAvatar" alt={userItem.name} src="../assets/danielSync.jpg"/>
            {userItem.name}
        </div>
    )
}
  
export { UserItem }