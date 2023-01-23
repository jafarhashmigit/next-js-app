exports.ok = (res, msg, data) => {
    let success = true;
    if (data.length <= 0) {
        // not data return success false
        success = false;
    }
    res.json({
        is_success: success,
        status: 200,
        message: msg,
        data: data,
    });
};
