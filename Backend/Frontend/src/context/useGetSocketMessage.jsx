import React, { useEffect } from "react";
import { useSocketContext } from "./SocketContext.jsx";
import useConversation from "../stateManage/useConversation.js";

const useGetSocketMessage = () => {
    const { socket } = useSocketContext();
    const { setMessages } = useConversation();

    useEffect(() => {
        if (!socket) return;
        const handler = (newMessage) => {
            setMessages(prevMessages =>
                Array.isArray(prevMessages)
                    ? [...prevMessages, newMessage]
                    : [newMessage]
            );
        };
        socket.on("newMessage", handler);
        return () => {
            socket.off("newMessage", handler);
        };
    }, [socket, setMessages]);
};

export default useGetSocketMessage;