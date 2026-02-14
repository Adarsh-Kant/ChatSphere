import React  from "react";
import Search from "./search";
import Users from "./users";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function Left() {
    const handleLogout = async () => {
        try {
            await axios.post('/user/logout', {}, { withCredentials: true });
            localStorage.removeItem("messenger");
            Cookies.remove("token");
            toast.success("Logout Successfully");
            window.location.reload();
        } catch (error) {
            console.log(error);
            toast.error("Error during logout. Please try again.");
        }
    };

    return (
        <div className="w-full h-full bg-black text-white flex flex-col">
            <div className="flex justify-between items-center px-4 md:px-8 mt-2 mb-2">
                <h1 className="font-bold text-2xl md:text-3xl">Chats</h1>
                <button onClick={handleLogout} className="md:hidden">
                    <FiLogOut className="text-2xl hover:bg-gray-800 rounded-lg p-1" />
                </button>
            </div>
            <Search />
            <hr className="border-gray-700"></hr>
            <Users/>
        </div>
    );
}
