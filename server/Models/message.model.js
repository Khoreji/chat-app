const sequelize = require("../Utils/connection");
const Sequelize = require("sequelize");

const Message = sequelize.define("message", {
    message: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    sender: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    receiver: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    timestamp: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

sequelize.sync({ force: false }).then(() => {
    console.log("Message table created");
}
).catch((err) => {
    console.log(err);
});

module.exports = Message;