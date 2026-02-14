import React from "react";
export default function Message({ message }) {
    const authUser = JSON.parse(localStorage.getItem("messenger"));
    const itsme = message.senderId === authUser.user._id;
    const alignItems = itsme ? "flex-end" : "flex-start";
    // const bubbleBg = itsme ? "#820c0cff" : "aqua";
    const bubbleBg = itsme ? "#0ea5e9" : "#6d28d9";
    const bubbleColor = itsme ? "white" : "white";
    const createdAt=new Date(message.createdAt);
    const formattedTime=createdAt.toLocaleTimeString([],{
        hour:"2-digit",
        minute:"2-digit"
    })
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: alignItems,
                    padding: '16px'
                }}
            >
                <div
                    style={{
                        background: bubbleBg,
                        color: bubbleColor,
                        padding: '10px 16px',
                        borderRadius: '16px',
                        maxWidth: '70%',
                        marginBottom: '8px',
                        alignSelf: alignItems
                    }}
                >
                    {message.message}
                </div>
                <div>{formattedTime}</div>
            </div>
        </div>
    );
}