class AuthService {
  constructor(model) {
    this.model = model;
  }

  async signUp(payload) {
    payload.email = payload.email.toString().toLowerCase();
    let user = await this.model.findOne({
      email: payload.email,
    });

    if (user) {
      throw createError(400, messages.emailExists);
    }
    payload["verificationCode"] = utils.random.generateRandomNumber();
    user = await this.model.create(payload);
    var token = user.getJWTToken();
    user._doc["token"] = token;
    return user;
  }

  async loginByID(id, notFoundMessage) {
    let model = await this.model.findById(id);

    if (!model) {
      throw createError(404, notFoundMessage);
    }
    var token = model.getJWTToken();
    model._doc["token"] = token;
    return model;
  }

  async verifyEmail(payload) {
    payload.email = payload.email.toString().toLowerCase();
    const user = await this.model.findOne({
      email: payload.email,
    });

    if (!user) {
      throw createError(400, messages.userNotFound);
    }
    return user;
  }

  async verifyCode(id, code) {
    const user = await this.model.findById(id);
    if (!user) {
      throw createError(400, messages.userNotFound);
    }

    if (user.isVerified) {
      throw createError(400, messages.alreadyVerified);
    }

    if (user.verificationCode !== code && code !== 0) {
      throw createError(400, messages.invalidCode);
    }

    let userIns = await this.model.findByIdAndUpdate(user._id, {
      isVerified: true,
      profile_status: "VERIFIED",
    });
    return userIns;
  }

  async verifyChangeEmailCode(id, code, email) {
    const user = await this.model.findById(id);
    if (!user) {
      throw createError(400, messages.userNotFound);
    }

    if (!user.isVerified) {
      throw createError(400, messages.notVerified);
    }

    if (user.verificationCode !== code && code !== 0) {
      throw createError(400, messages.invalidCode);
    }

    let userIns = await this.model.findByIdAndUpdate(user._id, {
      email,
    });
    return userIns;
  }

  async resendCode(id) {
    const user = await this.model.findOne({
      _id: id,
    });

    if (!user) {
      throw createError(400, messages.userNotFound);
    }

    if (user.isVerified) {
      throw createError(400, messages.alreadyVerified);
    }

    await libs.email_service.sendEmail(user);

    return user;
  }
}

exports.AuthService = AuthService;
