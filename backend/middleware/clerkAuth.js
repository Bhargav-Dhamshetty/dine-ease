const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');

const requireAuth = (req, res, next) => {
    try {
        return ClerkExpressWithAuth()(req, res, next);
    } catch (error) {
        console.error("Authentication Error:", error);
        return res.status(401).json({ message: "Unauthenticated. Please login again." });
    }
};

module.exports = requireAuth;