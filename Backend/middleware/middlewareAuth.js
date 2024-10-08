const jwt = require('jsonwebtoken');
const HttpError = require('../models/errorModel');

const middlewareAuth = async (req, res, next) => {
    const authorization = req.headers.authorization || req.headers.Authorization;
    if (authorization && authorization.startsWith("Bearer ")) {
        const token = authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return next(new HttpError("Unauthorized. Invalid token", 403));
            }
            req.user = decoded;
            next();
        });
    } else {
        return next(new HttpError("Unauthorized. No token", 401));
    }
}

module.exports = middlewareAuth;
