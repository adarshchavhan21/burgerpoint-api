
exports.error = (err, req, res, next) => {
    let {status, message} =  err;
    status = status || 500;
    message = message || 'Internal server error';
    
    res.status(status).send({
        success: false,
        message
    });
}