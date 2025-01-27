const express = require('express')
const { registerUser, loginUser} = require('../controllers/userController')
const userRouter = express.Router()

//register a new user
userRouter.post('/register', registerUser )

//login an existing user
userRouter.post('/login', loginUser)

module.exports = userRouter