module.exports = {
  generalError: "Something went wrong.",
  invalidLogin: "Invalid email or password",
  InvalidToken: "Invalid token.",
  created: (name) => {
    return `${name} has been created successfully!`;
  },
  signedIn: "You have been signed in successfully",
  updatedModel: (model) => {
    return `${model} has been updated successfully!`;
  },
  invalidPayload: "Invalid payload",
  userNotFound: "Couldn't find your Account",
  success: "Success!",
  notFound: (model) => {
    return `${model} does not exist!`;
  },
  verified: "Email verified successfully",
  notVerified: "Email not verified",
  invalidCode: "Code you entered is not valid",
  alreadyVerified: "Your Email is already verified",
  resendCode: "verification code has been sent to you again",
  SocialSignInMessage: (provider) => {
    return `You have been signed In successfully using ${provider}`;
  },
  SocialSignUpMessage: (provider) => {
    return `You have been registered successfully using ${provider}`;
  },
  badRequest: "Bad request",
  notPresent: "Not present in the payload",
  invalidFormat: (service) => {
    return `Invalid ${service} Format`;
  },
  invalidLength: "Invalid Length!",
  notEmpty: "This field must not be empty!",
  invalidDataType: (val) => {
    return `Please provide valid ${val}!`;
  },
  emailExists: "Email already exists!",
  sessionExpiry: "Session has been expired!",
  updateAttr: (attr) => {
    return `${attr} has been updated successfully!`;
  },
  codeExpired: "Your code has been expired!",
  invalidEmail: "invalid email",
  invalidEmailOrPassword: "invalid email or password",
  invalidId: "Invalid Id!",
  invalidQuery: (param) => {
    return `Query param ${param} cannot be empty`;
  },
  weakPassword: 'Password Not Strong',
  userExists: "another user already exist",
  alreadyInVited: 'You have already been invited',
  goNextStep: 'Move On Next Step',
  successfully: (param)=>{
    return `Your ${param} is successfully`;
  },
  userWaiting: 'user on waiting list',
  codeSend: 'code send to your account',
  routerNotFound: 'Not Found',
  previousPassword: 'Cannot use previous password',
  userNameNotValid: 'Username not valid',
  wrongType: 'Wrong Type'
};
