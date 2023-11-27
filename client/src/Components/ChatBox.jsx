import axios from "axios";
import { useEffect, useState } from "react";
import Chat from "./Chat";
import baseUrl from "../Config/config";
import socket from "../Config/socket";


const ChatBox = (props) => {
    let { activeId } = props;
    let chatBox = document.querySelector('.chat-box');

    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState(false);

    useEffect(() => {
        setMessages([]);
        axios.post(`${baseUrl}/message/list`, {
            receiver: activeId,
        }, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        }).then((response) => {
            let messages = response?.data?.messages || [];
            messages.sort((a, b) => {
                return a.timestamp - b.timestamp;
            });
            setMessages(messages);
        }).catch((error) => {
            console.log(error);
        });
    }, [activeId]);

    useEffect(() => {
        socket.on('message', (message_array) => {
            let messages = message_array || [];
            messages.sort((a, b) => {
                return a.timestamp - b.timestamp;
            });
            setMessages(messages);

        });

        socket.on('typing', (data) => {
            let me = Number(localStorage.getItem('user'));
            if (Number(data.receiver) === Number(me) && Number(data.sender) === Number(activeId)) {
                setTyping(true);
            }
        });
    }, []);
    let typingTimeout = null;

    useEffect(() => {
        if (chatBox) {
            chatBox.scrollTop = chatBox?.scrollHeight;
        }
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            setTyping(false);
        }, 1000);
    }, [typing]);

    useEffect(() => {
        if (chatBox) {
            chatBox.scrollTop = chatBox?.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="chat-box">
            {
                messages.map((message_obj) => {
                    let { message, sender, timestamp } = message_obj;
                    return (
                        <Chat msg={message} own={Number(sender) !== Number(activeId)} key={timestamp + Math.random()} />
                    )
                })
            }
            {
                typing && <Chat msg="Typing..." own={false} key={"typing"} typing={true}/>
            }
        </div>
    )
}

export default ChatBox;