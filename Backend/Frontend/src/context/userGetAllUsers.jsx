import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserGetAllUsers() {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/user/getUserProfile',
                    { withCredentials: true }
                );
                setAllUsers(response.data);
            } catch (error) {
                console.log("Error fetching all users:", error);
            }
            setLoading(false);
        };
        getUsers();
    }, []);
    return [allUsers, loading];
}