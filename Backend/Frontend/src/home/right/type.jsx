import React,{useState} from "react";
import { IoMdSend } from "react-icons/io";
import useSendMessage from "../../context/useSendMessage.js"
export default function Type() {
    const {loading, sendMessages}= useSendMessage();
    const [message, setMessage]=useState("");
    const handleSubmit=async(e)=>{
        e.preventDefault();
        await sendMessages(message);
        setMessage("")
    }
    return (
        <>
        <form action="" onSubmit={handleSubmit}>
            <div className="flex space-x-2 text-center px-2 md:px-4">
            <div className="flex-1 px-2 md:px-4">
                <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Type here" className="py-2 md:py-3 px-3 border border-gray-700 rounded-lg flex items-center grow outline-none bg-slate-800 w-full text-sm md:text-base" />
            </div>
            <button className="text-2xl md:text-4xl"><IoMdSend /></button>
            </div>
        </form>
        </>
    );
}