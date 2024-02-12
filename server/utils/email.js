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

console.log("EMAIL_ADDRESS:", process.env.EMAIL_ADDRESS);
console.log("EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD);

module.exports = transporter;
