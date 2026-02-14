import React  from "react";
import Search from "./search";
import Users from "./users";

export default function Left() {
    return (
        <div className="w-full h-full bg-black text-white flex flex-col">
            <h1 className="px-4 md:px-8 mt-2 mb-2 font-bold text-2xl md:text-3xl">Chats</h1>
            <Search />
            <hr className="border-gray-700"></hr>
            <Users/>
        </div>
    );
}