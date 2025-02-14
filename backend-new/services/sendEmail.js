// services/sendEmail.js
const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text, html) => {
  try {
    // Create a transporter using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can use other services like 'outlook', 'yahoo', etc.
      auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL, // The sender's email address
      to, // The recipient's email address
      subject,
      text, // Plain text version
      html, // HTML version
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
