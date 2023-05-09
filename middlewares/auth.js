const { createError } = require("../utils/createError");

exports.auth = async(req, res, next) => {
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401, 'User not logged'));
    }
    next();
}