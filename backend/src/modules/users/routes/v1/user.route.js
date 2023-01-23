router
  .post(
    "/users/auth/signUp",
    middlewares.validation.request,
    actions.users.auth.signUp
  )
  .post(
    "/users/auth/login",
    validators.users.signInPayloadValidation,
    middlewares.validation.request,
    middlewares.local_passport.authenticate,
    actions.users.auth.signIn
  )
  .post(
    "/users/addPhone",
    middlewares.validation.request,
    actions.users.auth.addPhoneNumber
  )
  .post(
    "/users/verifyPhone",
    middlewares.validation.request,
    actions.users.auth.verifyPhone
  )
  .post(
    "/users/updateProfile",
    middlewares.validation.request,
    actions.users.auth.updateProfile
  )
  .post(
    "/users/auth/verifyEmail",
    middlewares.validation.request,
    actions.users.auth.verifyEmail
  )

  .post(
    "/users/auth/verify-code/:id",
    middlewares.id_validation.validateId,
    validators.users.verifyCodePayloadValidation,
    middlewares.validation.request,
    actions.users.auth.verifyCode
  )
  .post(
    "/users/auth/resend-code/:id",
    validators.users.resendCodePayloadValidation,
    middlewares.validation.request,
    actions.users.auth.resendCode
  )
  .patch(
    "/users/auth/forgot-password",
    validators.users.emailPayloadValidation,
    middlewares.validation.request,
    actions.users.auth.forgotPassword
  )
  .patch(
    "/users/auth/reset-password/:id",
    middlewares.validation.request,
    actions.users.auth.resetPassword
  );

module.exports = { prefix: "users", router };
