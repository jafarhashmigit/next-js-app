const VerifyCodeSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        verificationCode: {
            type: Number,
            default: 0,
        },
        codeIdentity: {
            type: String,
            default: "",
            enum: ["forgot_password", "verify_phone", "email"],
        },
        codeExpiry: Date,
        updatedIdentityValue: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("VerifyCode", VerifyCodeSchema);
