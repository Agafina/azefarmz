const userModel = require('../models/User')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const bcrypt = require('bcrypt')
const sendEmail = require('../services/sendEmail')

const createToken = (userId) => {
    return jwt.sign({userId}, process.env.SECRET)
}

const createResetToken = (userId) => {
  return jwt.sign({ userId }, process.env.RESET_SECRET, { expiresIn: "1h" }); // Reset token valid for 1 hour
};


const registerUser = async(req, res) =>{
    const{ name, email, password} = req.body
    try{
      const exists = await userModel.findOne({ email });
      if (exists) {
        return res.json({ success: false, mssg: "Email already exist" });
      }
      // validating Email
      if (!validator.isEmail(email)) {
        return res.json({ success: false, mssg: "Please Enter a valid Email" });
      }

      //Encrypting password
      if (password.length < 8) {
        return res.json({
          success: false,
          mssg: "Please enter Strong password with atleast 8 character",
        });
      }

      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);

      const newUser = userModel({
        name: name,
        email: email,
        password: hashedPassword,
      });
      const user = await newUser.save();
      const token = createToken(user._id);

      const subject = "Welcome to Our Platform!";
      const text = `Hello ${user.name},\nWelcome to our platform! We're glad to have you on board.`;
      const html = `<p>Hello <strong>${user.name}</strong>,</p><p>Welcome to our platform! We're glad to have you on board.</p>`;
      await sendEmail(user.email, subject, text, html);

      res.json({ success: true, token, user });
    }catch(error){
        console.log(error);
        res.json({success:false, mssg:"Error"})
    }
}

const loginUser = async(req,res) => {
    const {email, password} = req.body
    try{
        const  user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, mssg:"Email not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success:false, mssg:"Invalid credentials"})
        }
        const token = createToken(user._id)
        res.json({success:true, token, user})
    }catch(error){
        console.log(error);
        res.json({success:false, mssg:"Error"})
    }
}

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, mssg: "Email not found" });
    }

    // Generate reset token
    const resetToken = createResetToken(user._id);
    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`; // Frontend reset link

    // Send reset email
    const subject = "Password Reset Request";
    const text = `Hello, \nYou requested a password reset. Click the link below to reset your password:\n${resetLink}\nIf you did not request this, please ignore this email.`;
    const html = `<p>Hello,</p><p>You requested a password reset. Click the link below to reset your password:</p><a href="${resetLink}">Reset Password</a><p>If you did not request this, please ignore this email.</p>`;

    await sendEmail(user.email, subject, text, html);

    res.json({ success: true, mssg: "Password reset link sent to email" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, mssg: "Error processing request" });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.RESET_SECRET);
    const user = await userModel.findById(decoded.userId);

    if (!user) {
      return res.json({ success: false, mssg: "Invalid or expired token" });
    }

    if (newPassword.length < 8) {
      return res.json({
        success: false,
        mssg: "Password must be at least 8 characters long",
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password in DB
    user.password = hashedPassword;
    await user.save();

    // Send security email
    const subject = "Your Password Has Been Updated";
    const text = `Hello, \nYour password was successfully updated. If this wasn't you, please contact support immediately.`;
    const html = `<p>Hello,</p><p>Your password was successfully updated. If this wasn't you, please contact support immediately.</p>`;

    await sendEmail(user.email, subject, text, html);

    res.json({ success: true, mssg: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, mssg: "Invalid or expired token" });
  }
};

module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword
}