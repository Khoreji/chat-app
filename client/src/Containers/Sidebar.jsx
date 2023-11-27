import axios from 'axios';
import { useEffect, useState } from 'react';
import ChatCard from '../Components/ChatCard';
import './containers.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import baseUrl from '../Config/config';


const Sidebar = (props) => {
    let { activeId, setActiveId, userList, setUserList } = props;

    useEffect(() => {
        axios.get(`${baseUrl}/user/list`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        }).then((response) => {
            setUserList(response?.data?.users || []);
        }).catch((error) => {
            console.log(error?.response?.data);
            if(error?.response?.data?.error === "Unauthorized - Invalid token"){
                localStorage.removeItem('token');
                window.location.href = '/';
            }
        });
    }, []);

    return (
        <div className="sidebar-main">
            <div className="sidebar-header">
                <div className="sidebar-header-text">
                    Chats
                </div>
                <div className="search-input-container">
                    <i className="fas fa-search search-icon"></i>
                    <input
                        type="text"
                        placeholder="Search Users"
                        className="search-input"
                    />
                </div>
                <div className='sidebar-chats-container'>
                    {
                        userList.map((user) => {
                            let { id } = user;
                            return (
                                <ChatCard
                                    key={id}
                                    active={activeId === id}
                                    id={id}
                                    setActiveId={setActiveId}
                                    user = {user}
                                />
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Sidebar;