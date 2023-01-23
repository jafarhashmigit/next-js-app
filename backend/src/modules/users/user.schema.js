const UserSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, trim: true },
    password: {
      type: String,
      set: (val) => utils.hash.makeHashValue(val),
    },
    profilePhoto: {
      type: String,
      default: "",
    },
    phone_number: String,
    location: String,
    accessToken: {
      type: String,
      default: "",
    },
    verificationCode: {
      type: Number,
      default: 0,
    },
    
    codeExpiryTime: { type: Date },
    phoneVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.methods.verifyPassword = function (pwd) {
  return this.password == utils.hash.makeHashValue(pwd);
};

UserSchema.methods.getJWTToken = function () {
  const payload = {
    name: this.firstName + " " + this.lastName,
    email: this.email,
    id: this.id,
    model: "users",
  };

  return JWT.sign(payload, process.env.JWTSECRET, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
};

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  return _.omit(obj, [
    "password",
    "verificationCode",
    "isVerified",
    "codeExpiryTime",
  ]);
};

module.exports = mongoose.model("Users", UserSchema);
