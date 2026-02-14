import React, { useRef, useEffect } from 'react';
import Message from './message.jsx';
import useGetMessage from '../../context/useGetMessage.js';
import Loading from '../../components/Loading.jsx';
import useGetSocketMessage from '../../context/useGetSocketMessage.jsx';

export default function Messages() {
    const { messages, loading } = useGetMessage();
    useGetSocketMessage();
    const lastMessageRef = useRef();

    // Always treat messages as an array
    const safeMessages = Array.isArray(messages) ? messages : [];

    useEffect(() => {
        setTimeout(() => {
            if (lastMessageRef.current) {
                lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
            }
        }, 100);
    }, [safeMessages]);

    return (
        <div className="flex flex-col gap-2 pb-4 flex-1">
            {loading ? (
                <Loading />
            ) : (
                safeMessages.length > 0 &&
                safeMessages.map((message, idx) => (
                    <div
                        key={message._id}
                        ref={idx === safeMessages.length - 1 ? lastMessageRef : null}
                    >
                        <Message message={message} />
                    </div>
                ))
            )}
            {!loading && safeMessages.length === 0 && (
                <div className="flex flex-1 items-center justify-center min-h-[60vh]">
                    <p className='text-center font-bold text-2xl md:text-4xl'>Say Hi!</p>
                </div>
            )}
        </div>
    );
}