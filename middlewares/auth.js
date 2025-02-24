const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        console.log("❌ No token provided");
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        const tokenValue = token.split(" ")[1];
        const verified = jwt.verify(tokenValue, process.env.JWT_SECRET);

        console.log("✅ Token verified, user:", verified);

        req.user = { id: verified.id };
        next();
    } catch (error) {
        console.log("❌ Token verification failed:", error);
        res.status(400).json({ message: 'Invalid token' });
    }
};
