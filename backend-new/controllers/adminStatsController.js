const orderModel = require("../models/Order");
const productModel = require("../models/Product");
const userModel = require("../models/User");

const getAdminStats = async (req, res) => {
  try {
    // Get total number of orders
    const totalOrders = await orderModel.countDocuments();

    // Get total number of successful payments
    const successfulPayments = await orderModel.countDocuments({
      status: "Paid",
    });

    // Get total revenue (sum of the amount of all paid orders)
    const totalRevenue = await orderModel.aggregate([
      { $match: { status: "Paid" } },
      { $group: { _id: null, totalRevenue: { $sum: "$amount" } } },
    ]);

    // Get total number of products
    const totalProducts = await productModel.countDocuments();

    // Get total number of users
    const totalUsers = await userModel.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalOrders,
        successfulPayments,
        totalRevenue: totalRevenue[0] ? totalRevenue[0].totalRevenue : 0,
        totalProducts,
        totalUsers,
      },
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAdminStats,
};
