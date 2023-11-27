import axios from "axios";
import ChatBox from "../Components/ChatBox";
import UserAvatar from '../Assets/avatar-person.svg';
import ChatInput from "../Components/ChatInput";
import { useEffect, useState } from "react";
import baseUrl from "../Config/config";

const Chatscreen = (props) => {
    let { activeId, userList, me } = props;

    const [activeUser, setActiveUser] = useState({});
    const [messages, setMessages] = useState([]);
    

    useEffect(() => {
        userList.forEach((user) => {
            if (user.id === activeId) {
                setActiveUser(user);

            }
        });
    }, [activeId, userList]);


    return (
        activeUser?.user_name && <div className="chat-screen">
            <div className="chat-screen-header">
                <img className="chat-card-avatar" src={UserAvatar} alt="User Avatar" />
                <div className="chat-screen-header-text">
                    <div className="chat-screen-header-text-name">
                        {activeUser?.user_name || "User Name"}
                    </div>
                </div>
            </div>
            <ChatBox activeId={activeId}/>
            <ChatInput activeId={activeId} me={me}/>
        </div>
    );
};

export default Chatscreen;