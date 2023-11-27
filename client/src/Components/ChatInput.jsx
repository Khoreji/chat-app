import React, { useRef, useState } from 'react';
import axios from 'axios';
import baseUrl from '../Config/config';
import socket from '../Config/socket';

const ChatInput = (props) => {
    const { activeId } = props;

    const [message, setMessage] = useState("");

    const typing = () => {

        let me = Number(localStorage.getItem('user'))
        socket.emit('typing', {
            sender: me,
            receiver: activeId
        });
    }

    const sendMessage = () => {
        // message, receiver, timestamp

        let timestamp = Date.now();
        let receiver = activeId;



        if (!message) {
            return;
        }


        axios.post(`${baseUrl}/message/send`, {
            message,
            receiver,
            timestamp
        }, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        }).then((response) => {
            setMessage("");
        }).catch((error) => {
            console.log(error);
        });
    };
    return (
        <div className="chat-input-main">
            <div className="chat-input-container">
                <i className="fas fa-chat chat-icon"></i>
                <input
                    type="text"
                    placeholder="Aa"
                    className="chat-input"
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value)
                        typing();
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }
                    }
                />
            </div>
            {/* Send Icon */}
            <div className="chat-send-container">
                <i className="fas fa-paper-plane send-icon"
                    onClick={() => {
                        sendMessage();
                    }}
                ></i>
            </div>
        </div>
    );
};

export default ChatInput;