const { SENDGRID_APIKEY, EMAIL_FROM, SENDERGRID_URL } = process.env;

const config = {
  headers: { Authorization: `Bearer ${SENDGRID_APIKEY}` }
};
sgMail.setApiKey(SENDGRID_APIKEY);
exports.sendEmail = async function (user) {
  const msg = {
    to: user.email,
    from: "no-reply@mail.gmeez.com",
    subject: "GMEEZ verification code",
    text: "verification code",
    html: "Your verification code is " + user.verificationCode,
  };

  var sgResp = await sgMail.send(msg).catch((error) => {
    console.error(error.message);
  });
  console.log(sgResp);
};
// exports.sendEmail = async (user, subject, templateId) => {
//   try {
//     const result = await axios.post(SENDERGRID_URL, {
//       from: {
//         email: EMAIL_FROM,
//       },
//       personalizations: [
//         {
//           to: [
//             {
//               email: user.email,
//             },
//           ],
//           dynamic_template_data: {
//             code: user.code,
//             subject
//           },
//         },
//       ],
//       template_id: templateId,
//     }, config);
//   } catch (error) {
//     console.log(error);
//   }
// };
