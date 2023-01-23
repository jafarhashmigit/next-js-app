module.exports.randomCode = (res, message, is_success, status, data) => {
    res.status(status).json({
        message,
        is_success,
        status,
        data
    });
}