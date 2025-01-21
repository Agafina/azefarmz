const jwt = require('jsonwebtoken');

const authMiddleware = async(req, res, next) => {
    const {token} = req.headers;
    if(!token){
        return res.json({success:false, mssg:"Not Authorized Login again"});
    }
    try{
    const token_decode =  jwt.verify(token, process.env.SECRET);
    req.body.userId = token_decode.userId;
    next()
    }catch(error){
        console.log(error);
        res.json({success:false, mssg:"Error"})
    }
}

module.exports = authMiddleware