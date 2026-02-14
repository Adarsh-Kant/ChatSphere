import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi"; 
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "../../context/AuthProvider"; // If you use context
import toast from "react-hot-toast";

export default function Logout() {
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        try {
            const res=await axios.post('/user/logout', {}, { withCredentials: true });
            localStorage.removeItem("messenger");
            Cookies.remove("token");
            setLoading(false);
            toast.success("Logout Successfully");
            window.location.reload();
        } catch (error) {
            console.log(error);
            toast.error("Error during logout. Please try again.");
        }
    };

    return (
        <div className="w-[4%] h-full bg-slate-950 text-white flex flex-col justify-end">
            <div className="p-1 align-bottom">
                <button >
                    <FiLogOut className="text-5xl p-2 hover:bg-gray-800 rounded-lg" onClick={handleLogout}/>
                </button>
            </div>
        </div>
    );
}