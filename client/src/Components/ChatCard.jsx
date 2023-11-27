import './Components.css';
import UserAvatar from '../Assets/avatar-person.svg';
const ChatCard = (props) => {
    let { active, setActiveId, id, user } = props;
    // console.log(user);
    return (
        user?.user_name ? <div className={`chat-card ${active && "active"}`}
            onClick={() => setActiveId(id)}
        >
            <img className="chat-card-avatar" src={UserAvatar} alt="User Avatar" />
            <div className="chat-card-text">
                <div className="chat-card-text-name">
                    {user?.user_name || "User Name"}
                </div>
                <div className="chat-card-text-last-message">
                    {"What's up? Kya hal hain???"}
                </div>
            </div>
        </div > : <></>
    );
};

export default ChatCard;