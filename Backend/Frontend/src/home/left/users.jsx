import React from "react";
import User from "./user";
import UserGetAllUsers from "../../context/userGetAllUsers";
export default function Users() {
    const [allUsers,loading]=UserGetAllUsers();
    console.log(allUsers);
    return (
        <div className="my-2 flex-1 overflow-y-auto px-2">
        {allUsers.map((user,index)=>(
            <User key={index} user={user}/>
        ))}
        </div>
    );
}