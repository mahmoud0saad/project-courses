const jsonwebtoken = require('jsonwebtoken')
const appError = require('../utils/appError')

const verifyToken = (req, res, next) => {
    const authorization = req.headers['Authorization'] || req.headers['authorization'];
    if (!authorization) {
        const error = appError.create({ message: "token is  required", statusCode: 401 });
        return next(error);
    }

    try {
        const token = authorization.split(' ')[1];

        const currentUser = jsonwebtoken.verify(token, process.env.JWT_KEY);

        req.currentUser = currentUser;
        return next();

    } catch (ex) {
        const error = appError.create({ message: "invalid token", statusCode: 401 });
        return next(error);
    }

}
function getDataFromTokenJWT(token) {
    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_KEY);
        return decoded;
    } catch (err) {
        console.log('eerror  ', err);

        return null;
    }
}

module.exports = { verifyToken, getDataFromTokenJWT };