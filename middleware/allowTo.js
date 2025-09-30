const appError = require("../utils/appError");

module.exports = (...roles) => {

    return (req, res, next) => {
        if (!roles.includes(req.currentUser.role)) {
            const error = appError.create({ message: " you aren't allowed", statusCode: 402 });
            next(error);
        }
        console.log("curren role is ",req.currentUser.role);
        console.log("roles is ", roles);

        next();
    }

}