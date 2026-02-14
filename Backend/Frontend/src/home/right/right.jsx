import React from "react";
import Chatuser from "./chatuser.jsx";
import Messages from "./messages.jsx";
import Type from "./type.jsx";
import useConversation from "../../stateManage/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";

export default function Right({ setShowLeft }) {
    const { selectedConversation } = useConversation();

    return (
        <div className="w-full bg-slate-900 text-white h-screen flex flex-col">
            {!selectedConversation ? (
                <Nochat />
            ) : (
                <>
                    <Chatuser setShowLeft={setShowLeft} />
                    <div className="flex-1 overflow-y-auto my-2" style={{ maxHeight: 'calc(89vh - 10.5vh)' }}>
                        <Messages />
                    </div>
                    <div className="p-2 border-t border-gray-800 bg-slate-900">
                        <Type />
                    </div>
                </>
            )}
        </div>
    );
}

const Nochat = () => {
    const [authUser] = useAuth();
    return (
        <div className="flex flex-1 items-center justify-center min-h-[60vh]">
            <h1 className="text-center font-semibold text-3xl">
                Welcome <span>{authUser.user.name}</span>
                <br />
                Select a chat to start messaging
            </h1>
        </div>
    );
};