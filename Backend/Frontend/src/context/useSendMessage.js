import React,{ useState } from "react";
import axios from "axios";
import useConversation from "../stateManage/useConversation.js";

const useSendMessage=()=> {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessages = async (message) => {
        setLoading(true);
        try {
            const response = await axios.post(
                `https://chatsphereoriginal.onrender.com/message/send/${selectedConversation._id}`,
                { message },
                { withCredentials: true }
            );
            
            setMessages(prev => {
                const safePrev = Array.isArray(prev) ? prev : [];
                return [...safePrev, response.data];
            });
            setLoading(false); 
        } catch (error) {
            console.log("Error in useSendMessage: ", error);
            setLoading(false);
        }
    };

    return { loading, sendMessages };
};

export default useSendMessage;
