const sequelize = require("../Utils/connection");
const Sequelize = require("sequelize");

// Users should be able to provide their information, including name, email, mobile number, and gender. Store user data in the MySQL database.

// Define the User model

const User = sequelize.define("user", {
    user_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    user_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    user_mobile: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    user_gender: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    user_password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

// sequelize.sync({ force: false }).then(() => {
//     console.log("User table created");
// }).catch((err) => {
//     console.log(err);
// });

// Export the User model
module.exports = User;