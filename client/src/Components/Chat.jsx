const Chat = (props) => {
    let { msg, own, typing } = props;
    return (
        <div className={`message ${own ? 'own' : 'other'} ${typing ? 'typing' : ''}`}>
            {msg}
        </div>
    )
}

export default Chat;