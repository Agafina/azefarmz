const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const bcrypt = require('bcrypt')

const createToken = (userId) => {
    return jwt.sign({userId}, process.env.SECRET)
}
const registerUser = async(req, res) =>{
    const{ name, email, password} = req.body
    try{
        const exists = await userModel.findOne({email})
    if(exists){
        return res.json({success: false, mssg:"Email already exist"})
    }
    // validating Email
    if(!validator.isEmail(email)){
        return res.json({success:false, mssg:"Please Enter a valid Email"})
    }

    //Encrypting password
    if(password.length < 8){
        return res.json({success:false, mssg:"Please enter Strong password with atleast 8 character"})
    }

    const salt = await bcrypt.genSalt(10)
    hashedPassword = await bcrypt.hash(password,salt)

    const newUser = userModel({
        name:name,
        email:email,
        password:hashedPassword
    })
    const user = await newUser.save()
    const token = createToken(user._id)
    res.json({success:true, token})
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
        res.json({success:true, token})
    }catch(error){
        console.log(error);
        res.json({success:false, mssg:"Error"})
    }
}

module.exports = {
    registerUser,
    loginUser
}