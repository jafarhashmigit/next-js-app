const { default: axios } = require("axios");

const authService = new services.AuthService(models.Users);
const crudService = new services.CrudService(models.Users);

exports.auth = {
  signUp: async (req, res, next) => {
    const { body: payload } = req;
    try {
      let Users = await authService.signUp(payload);

      return res.json({
        status: 200,
        message: messages.created("Users"),
        data: Users,
      });
    } catch (err) {
      next(err);
    }
  },
  signIn: async (req, res, next) => {
    try {
      const token = req.user.getJWTToken();
      req.user._doc["token"] = token;
      return res.json({
        status: 200,
        message: messages.signedIn,
        data: req.user,
      });
    } catch (err) {
      next(err);
    }
  },
  addPhoneNumber: async (req, res, next) => {
    try {
      const { body: payload } = req;
      payload.phoneVerified = false;
      let user = await crudService.update(
        payload,
        req.user._id,
        messages.generalError
      );
      if (user) {
        let code = utils.random.generateRandomNumber();
        let date = new Date();
        const verifyData = {
          user_id: user._id,
          verificationCode: code,
          codeExpiry: date.setHours(date.getHours() + 1),
          codeIdentity: "verify_phone",
        };
        await models.VerifyCode.create(verifyData);
        await libs.sms_service.sendMessage(payload.phone_number, code);
        user = await crudService.update(
          {verificationCode: code},
          req.user._id,
          messages.generalError
        );
      }
   
      utils.apiResponse.ok(res, messages.success, user);
    } catch (err) {
      next(err);
    }
  },
  verifyPhone: async (req, res, next) => {
    try {
      const { body: payload } = req;
      var verifyQuery = {};
      verifyQuery.$and = [
        {
          user_id: req.user._id,
          verificationCode: payload.code,
        },
      ];
      console.log("verifyQuery",verifyQuery)
      let verifyData = await models.VerifyCode.find(verifyQuery);
      console.log("verifyData",verifyData,req.user._id)
      if (!verifyData) {
        throw createError(400, messages.invalidCode);
      }
      const currentTime = Date.now();
      if (currentTime > verifyData.codeExpiry) {
        throw createError(400, messages.codeExpried);
      }
      
      let user = await models.Users.find({_id:req.user._id});
     
      const phone_number = user.phone_number;
      await crudService.updateMany({
        "phone_number": phone_number

      }, {
        "phone_number": ""
      });
      user = await crudService.update(
        {
          phoneVerified: true,
          "phone_number": phone_number
        },
        req.user._id,
        messages.userNotFound
      );
      return utils.apiResponse.ok(
        res,
        messages.updateAttr("Phone Number"),
        user
      );
    } catch (err) {
      next(err);
    }
  },
  updateProfile: async (req, res, next) => {
    try {
      const { body: payload } = req;
      let user = await crudService.update(
        payload,
        req.user._id,
        messages.generalError
      );
      utils.apiResponse.ok(res, messages.success, user);
    } catch (err) {
      next(err);
    }
  },
  verifyEmail: async (req, res, next) => {
    try {
      let { body: payload } = req;
      let user = await authService.verifyEmail(payload);

      res.json({
        status: 200,
        message: messages.success,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  verifyCode: async (req, res, next) => {
    try {
      const id = req.params.id;
      const code = parseInt(req.body.code);

      let user = await authService.verifyCode(id, code);
      if (!user.isVerified) {
        throw createError(400, messages.notVerified);
      }
      return res.json({
        status: 200,
        message: messages.verified,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  resendCode: async (req, res, next) => {
    try {
      const id = req.params.id;
      let user = await authService.resendCode(id);

      return res.json({
        status: 200,
        message: messages.resendCode,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
  forgotPassword: async (req, res, next) => {
    try {
      let { body: payload } = req;
      let user = await authService.verifyEmail(payload);
      const verificationCode = utils.random.generateRandomNumber();
      user.verificationCode = verificationCode;
      let date = new Date();
      const verifyData = {
        user_id: user._id,
        verificationCode: verificationCode,
        codeExpiry: date.setHours(date.getHours() + 1),
        codeIdentity: "forgot_password",
      };
      await libs.email_service.sendEmail(user);
      await models.VerifyCode.create(verifyData);
      user = await crudService.update(
        {verificationCode: verificationCode, codeExpiryTime:verifyData.codeExpiry},
        user._id,
        messages.generalError
      );
      return utils.apiResponse.ok(res, messages.success, user);
    } catch (err) {
      next(err);
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const {
        body: { code, password },
        params: { id },
      } = req;
      const verificationCode = parseInt(code);
      let user = await models.Users.findById(id);
      if (!user) {
        throw createError(400, messages.userNotFound);
      }

      const currentTime = Date.now();
      // It will be empty when no request had been made for resetPassword
      if (!user.codeExpiryTime) {
        throw createError(400, messages.invalidCode);
      }
      if (currentTime - user.codeExpiryTime > dataConstraint.CODE_EXPIRY_TIME) {
        throw createError(400, messages.codeExpried);
      }
      if (user.verificationCode !== verificationCode) {
        throw createError(400, messages.invalidCode);
      }
      user = await crudService.update(
        { password },
        user._id,
        messages.userNotFound
      );
      return res.json({
        status: 200,
        message: messages.updateAttr("Password"),
        data: user,
      });
    } catch (err) {
      next(err);
    }
  },
};
