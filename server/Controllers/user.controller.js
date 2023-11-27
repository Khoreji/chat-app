const User = require("../Models/user.model");
const { Op } = require('sequelize');

const searchUser = async (req, res) => {
    const { searchString } = req.body;

    // Validate request
    if (!searchString) {
        return res.status(400).json({ error: 'Search string is required' });
    }

    const users = await User.findAll({
        where: {
            // Define your search criteria based on your model fields
            [Op.or]: [
                { user_name: { [Op.like]: `%${searchString}%` } },
                { user_email: { [Op.like]: `%${searchString}%` } },
                // Add more fields if needed
            ],
        },
    });

    if (users.length === 0) {
        return res.status(404).json({ error: 'No users found' });
    }

    res.status(200).json({ users });

};

const listAllUsers = async (req, res) => {
    // don't show own user in the list
    const users = await User.findAll({ where: { id: { [Op.ne]: req.user.id } } });

    if (users.length === 0) {
        return res.status(404).json({ error: 'No users found' });
    }

    res.status(200).json({ users });
};

module.exports = {
    searchUser,
    listAllUsers,
};