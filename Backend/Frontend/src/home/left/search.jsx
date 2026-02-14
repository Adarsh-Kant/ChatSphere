import React, {useState} from "react";
import { IoIosSearch } from "react-icons/io";
import userGetAllUsers from "../../context/userGetAllUsers.jsx"
import useConversation from "../../stateManage/useConversation.js"
import toast from "react-hot-toast";
export default function Search() {
    const [search, setSearch]=useState("");
    const [allUsers]=userGetAllUsers()
    const {setSelectedConversation}=useConversation()
    return (
        <div className="h-auto py-2 md:h-[10vh]">
        <div className="px-4 md:px-8 py-1">
            <form onSubmit={(e) => {
    e.preventDefault();
    if (!search) {
        return;
    }
    const conversation = allUsers.find((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
        setSelectedConversation(conversation);
        setSearch("");
    } else {
        toast.error("User Not Found");
    }
}}>
                <div className="flex space-x-2 md:space-x-3">
                <label className="px-2 border border-gray-700 bg-slate-900 rounded-lg flex items-center gap-2 w-full">
                    <input type="text" placeholder="Search" className="px-2 md:px-3 py-2 grow outline-none bg-transparent text-sm md:text-base" value={search} onChange={(e)=>setSearch(e.target.value)} />
                </label>
                <button>
                    <IoIosSearch className="text-3xl md:text-5xl p-1 md:p-2 hover:bg-gray-800 rounded-full"/>
                    {/* <IoIosSearch></IoIosSearch> */}
                </button>
                </div>
            </form>
        </div>
        </div>
    );
}