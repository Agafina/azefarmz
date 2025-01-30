const userModel = require("../models/User");
const jwt = require("jsonwebtoken");

const adminMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, mssg: "Not Authorized Login again" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.SECRET);
    const userId = token_decode.userId;

    // Find the user in the database by userId
    const user = await userModel.findById(userId);

    // If user does not exist or is not an admin, return an error
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "Access denied, login first." });
    }
    // If user does not exist or is not an admin, return an error
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Access denied, admin only." });
    }

    // If user is admin, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = adminMiddleware;
