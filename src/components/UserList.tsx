import React from 'react'
import './../App.css';
import { UserItem } from "./UserItem";



export default function UserList({userList}: any) {
    return (
    <div className="userList">
        <h2>
            Lista de usuarios
        </h2>
            {userList.map((item: any) => 
                <UserItem userItem={item}/>
            )}
    </div>
    )
}
  
export { UserList }