const Message = require("../Models/message.model.js");

const sendMessage = async (req, res) => {

    try {
        const { message, receiver, timestamp } = req.body;
        let sender = req.user.dataValues.id;

        // Validate request
        if (!message || !sender || !receiver || !timestamp) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create a Message
        const messageIns = await Message.create({
            message,
            sender,
            receiver,
            timestamp
        });

        if (!messageIns) {
            return res.status(400).json({ error: 'Message sending failed' });
        }
        else {
            res.status(200).json({ message: 'Message sent successfully' });
            listAllMessages2(receiver, sender);
        }

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const listAllMessages = async (req, res) => {
    const { receiver } = req.body;
    let sender = req.user.dataValues.id;

    // Validate request
    if (!sender || !receiver) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const messages = await Message.findAll({
        where: {
            sender: sender,
            receiver: receiver
        }
    });

    const messages2 = await Message.findAll({
        where: {
            sender: receiver,
            receiver: sender
        }
    });


    if (messages.length === 0 && messages2.length === 0) {
        return res.status(404).json({ error: 'No messages found' });
    }

    messages.push(...messages2);



    res.status(200).json({ messages });
};

const listAllMessages2 = async (receiver, sender) => {

    // Validate request
    if (!sender || !receiver) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const messages = await Message.findAll({
        where: {
            sender: sender,
            receiver: receiver
        }
    }) || [];

    const messages2 = await Message.findAll({
        where: {
            sender: receiver,
            receiver: sender
        }
    }) || [];

    messages.push(...messages2);

    global.eventEmitter.emit('message', messages);
}


module.exports = {
    sendMessage,
    listAllMessages,
};
