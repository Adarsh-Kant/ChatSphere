import React, { useState, useEffect } from "react";
import useConversation from "../stateManage/useConversation.js";
import axios from "axios";

const useGetMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            if (selectedConversation && selectedConversation._id) {
                try {
                    const response = await axios.get(
                        `http://localhost:5002/message/get/${selectedConversation._id}`,
                        { withCredentials: true }
                    );
                    setMessages(response.data);
                } catch (error) {
                    console.log("Error in useGetMessage: ", error);
                }
            }
            setLoading(false);
        };
        getMessages();
    }, [selectedConversation, setMessages]);

    return {
        messages,
        loading
    };
};
export default useGetMessage;