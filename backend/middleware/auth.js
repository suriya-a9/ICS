const jwt = require('jsonwebtoken');

module.exports = function (requiredRoles = []) {
    return (req, res, next) => {
        const token = req.header('Authorization')?.replace('Bearer ', '') || req.query.token;
        if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.admin = decoded;
            if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
                return res.status(403).json({ msg: 'Forbidden - insufficient role' });
            }
            next();
        } catch (err) {
            return res.status(401).json({ msg: 'Token is not valid' });
        }
    };
};
