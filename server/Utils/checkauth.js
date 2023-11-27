const jwt = require('jsonwebtoken');
const User = require('../Models/user.model.js');
const { secret_key } = require('./config.js');

const authenticateUser = async (req, res, next) => {
    // Get the token from the request headers
    const token = req?.body?.authorization || req?.query?.authorization || req?.headers?.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, secret_key);

        // Fetch the user from the database based on the user ID in the token
        const user = await User.findByPk(decoded.userId);

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized - Invalid user' });
        }

        // Attach the user to the request object for future use in routes
        req.user = user;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
};

module.exports = authenticateUser;
