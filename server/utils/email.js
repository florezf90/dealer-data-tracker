const nodemailer = require("nodemailer");
require("dotenv").config();

// Create and configure the Nodemailer transporter object
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS, // Replace with your email address
    pass: process.env.EMAIL_PASSWORD, // Replace with your email password or an app-specific password
  },
  authMethod: "LOGIN",

  
});

console.log(`please do not forget to create a .env file in the server folder with your email address and app password to get the contact us form working, get
  your app password from https://support.google.com/mail/answer/185833?hl=en`);

module.exports = transporter;
