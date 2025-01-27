const userModel = require("../models/User");

const adminMiddleware = async (req, res, next) => {
  try {
    // Get the userId from the decoded token (from the authMiddleware)
    const userId = req.body.userId;

    // Find the user in the database by userId
    const user = await userModel.findById(userId);

    // If user does not exist or is not an admin, return an error
    if (!user || user.role !== "admin") {
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
