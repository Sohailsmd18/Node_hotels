const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
    // Extract jwt token from the request headers
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Invalid token' });

    try {
        // Verify jwt
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach user information to the request object
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Function to generate token
const generateToken = (userData) => {
    // Generate a new jwt token using user data
    return jwt.sign(userData, process.env.JWT_SECRET);
};

module.exports = { jwtAuthMiddleware, generateToken };
