const User = require("../Models/user.model.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret_key } = require("../Utils/config.js");
// Create and Save a new User
const register = async (req, res) => {
    try {
        const { user_name, user_email, user_mobile, user_gender, user_password } = req.body;

        // Validate request
        if (!user_name || !user_email || !user_mobile || !user_gender || !user_password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if user already exists with the same email or mobile
        const existingEmailUser = await User.findOne({ where: { user_email } });
        if (existingEmailUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        const existingMobileUser = await User.findOne({ where: { user_mobile } });
        if (existingMobileUser) {
            return res.status(400).json({ error: 'User with this mobile number already exists' });
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user_password, salt);

        // Create a User
        const user = await User.create({
            user_name,
            user_email,
            user_mobile,
            user_gender,
            user_password: hash
        });

        if (!user) {
            return res.status(400).json({ error: 'User registration failed' });
        }
        else {
            // console.log('User created successfully');
        }

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { user_email, user_password } = req.body;

        // Validate request
        if (!user_email || !user_password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Check if the user exists
        const user = await User.findOne({ where: { user_email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check if the password is correct
        const isPasswordValid = bcrypt.compareSync(user_password, user.user_password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, secret_key, {
            expiresIn: '1h', // You can adjust the expiration time
        });

        res.status(200).json({ token, userId: user.id });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    register,
    login
};


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMDQ1OTkwMiwiZXhwIjoxNzAwNDYzNTAyfQ.XbN2kiX5u4DAVkhBnNang7LtlX7Gq2dh7rC4i7cwX1o