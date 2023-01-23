const { validationResult } = require("express-validator");

exports.request = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    utils.response.response(res, errors.array()[0].msg, false, 200, null)
  }
  else{
    next();
  }
};
