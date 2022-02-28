import { Avatar } from '@nextui-org/react';
import React from 'react'
import './../App.css';

// import Avatar from "@material-ui/core/Avatar";



export default function UserItem({userItem}: any) {
    return (
        <div className="userItem">
            <Avatar
                className="userAvatar"
                text={userItem.name}
                size="lg"
                bordered
                squared/>
            <div className='userItemName'>
                {userItem.name}
            </div>
        </div>
    )
}
  
export { UserItem }