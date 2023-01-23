const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

exports.sendMessage = async function (phone, code) {
    const twilioResp = await client.messages
        .create({
            body: "Your verification code is " + code,
            from: "+16509004735",
            to: "+923045335432", // user.phoneNumber
        })
        .catch((error) => {
            console.error("twilio error message",error.message);
        });
    console.log(twilioResp,);
};
