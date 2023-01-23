
exports.userName = async(req, res, next) => {
  try {
    const { username } = req.body;
    if(username && validator.matches(username, "^[^.][a-zA-Z0-9_\.\]*[^\.]$") && !username.includes('@')){
      next();
    }
    else{
      utils.response.response(res, messages.invalidFormat('username'), false, 200, null)
    }
  } catch (error) {
    console.log(error);
    throw createError(500);
  }
};
