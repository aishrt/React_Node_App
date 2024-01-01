const nodemailer = require("nodemailer");

//These are the SMTP credentials
const smtp = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
};

// This is used to connect SMTP
const transport = nodemailer.createTransport(smtp);

// This is used to verify if successfully connected or not
transport
  .verify()
  .then(() => console.log("Connected to email server"))
  .catch(() =>
    console.log(
      "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
    )
  );

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @param {string} html (optional)
 * @returns {Promise}
 */
const sendEMail = async (to, subject, text, html) => {
  const msg = { from: process.env.SMTP_USERNAME, to, subject, text, html };
  await transport.sendMail(msg);
};

const contactUsMail = async (data) => {
  console.log(data, "aaaaaaaaaaaaaaaaaaaaaaaaaa");
  console.log("JANGLEEEEEEEEEEEEEE");
  const subject = "Inquiry from Website";
  // const text = `Hello Sir  , ${data?.name} has requested you to answer his questions ${data?.text} on hi phone number ${data?.phone_number}`;
  const html = `<h3>Hello Sir </h3> ,
  <p >
  You have new Inquiry request from <span style="font-weight: bold;"> ${data?.name} </span>.
  </p> 
   <p>${data?.text} </p> 
   <p>Contact Details </p>
   <ul>
   <li>
   ${data?.phone_number}
   </li>
   <li>
   ${data?.email}
   </li>
   </ul>`;

  const msg = {
    from: process.env.SMTP_USERNAME,
    to: process.env.SMTP_USERNAME,
    subject,
    // text,
    html,
  };
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const url = process.env.FRONTEND_URL;
  const subject = "Reset password";
  const resetPasswordUrl = `${url}/auth/reset-password/${to}/${token}`;
  const text = `Dear user, To reset your password, click on this link: ${resetPasswordUrl}
   If you did not request any password resets, then ignore this email.`;
  const html = `<p>Dear user, To reset your password, click on : <a href="${resetPasswordUrl}" target="_blank" style="font-weight: bold;">Reset password</a></p>
   <p>If you did not request any password resets, then ignore this email.</p>`;

  await sendEmail(to, subject, text, html);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @param {string} html (optional)
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, otp) => {
  const subject = "Email Verification";
  // replace this url with the link to the email verification page of your front-end app
  // const verificationEmailUrl = `http://link-to-app/verify-email?token=${otp}`;
  const text = `Dear user, Your Otp is ${otp} to verify your email`;
  const html = `Dear user, Your Otp is ${otp} to verify your email`;

  // To verify your email, click on this link: ${verificationEmailUrl}
  // If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text, html);
};

module.exports = {
  transport,
  sendEMail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  contactUsMail,
};
