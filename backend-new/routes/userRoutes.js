const express = require('express')
const { registerUser, loginUser, forgotPassword, resetPassword} = require('../controllers/userController')
const userRouter = express.Router()

//register a new user
userRouter.post('/register', registerUser )

//login an existing user
userRouter.post('/login', loginUser)

//password routes
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);

module.exports = userRouter