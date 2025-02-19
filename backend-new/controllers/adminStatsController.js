const orderModel = require("../models/Order");
const productModel = require("../models/Product");
const userModel = require("../models/User");
const moment = require("moment");

const getAdminStats = async (req, res) => {
  try {
    // Get total number of orders
    const totalOrders = await orderModel.countDocuments();

    // Active Orders (Processing, Shipped, Pending)
    const activeOrders = await orderModel.countDocuments({
      status: { $in: ["Processing", "Shipped", "Pending"] },
    });

    // Get total number of successful payments
    const successfulPayments = await orderModel.countDocuments({
      paid: true,
    });

    // Get Total Revenue (sum of all paid orders for current month)
    const totalRevenueData = await orderModel.aggregate([
      {
        $match: {
          paid: true,
          createdAt: { $gte: moment().startOf("month").toDate() },
        },
      },
      { $group: { _id: null, totalRevenue: { $sum: "$amount" } } },
    ]);
    const totalRevenue = totalRevenueData[0]
      ? totalRevenueData[0].totalRevenue
      : 0;

    // Get total revenue for last month
    const lastMonthRevenueData = await orderModel.aggregate([
      {
        $match: {
          paid: true,
          createdAt: {
            $gte: moment().subtract(1, "months").startOf("month").toDate(),
            $lt: moment().subtract(1, "months").endOf("month").toDate(),
          },
        },
      },
      { $group: { _id: null, totalRevenue: { $sum: "$amount" } } },
    ]);
    const lastMonthRevenue = lastMonthRevenueData[0]
      ? lastMonthRevenueData[0].totalRevenue
      : 0;

    // Calculate revenue percentage change
    let revenueChangePercentage = 0;
    if (lastMonthRevenue > 0) {
      revenueChangePercentage =
        ((totalRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;
    }

    // Determine revenue trend (up, down, or no change)
    let revenueTrend = "no-change"; // Default to no-change
    if (revenueChangePercentage > 0) {
      revenueTrend = "up"; // Revenue is trending up
    } else if (revenueChangePercentage < 0) {
      revenueTrend = "down"; // Revenue is trending down
    }

    // Get total number of products
    const totalProducts = await productModel.countDocuments();

    // Total Stock Count
    const totalStock = await productModel.aggregate([
      { $group: { _id: null, totalStock: { $sum: "$stock" } } },
    ]);
    const stockCount = totalStock[0] ? totalStock[0].totalStock : 0;

    // Low Stock Products (Stock < 10)
    const lowStock = await productModel.countDocuments({ stock: { $lt: 10 } });

    // Get total number of users
    const totalUsers = await userModel.countDocuments();

    // Get the date range for last month
    const startOfLastMonth = moment()
      .subtract(1, "months")
      .startOf("month")
      .toDate();
    const endOfLastMonth = moment()
      .subtract(1, "months")
      .endOf("month")
      .toDate();

    // Get the total number of users created in the last month
    const lastMonthUsersCount = await userModel.countDocuments({
      createdAt: { $gte: startOfLastMonth, $lt: endOfLastMonth },
    });

    // Calculate the percentage increase in users
    const percentageIncrease =
      totalUsers > 0 && lastMonthUsersCount > 0
        ? ((totalUsers - lastMonthUsersCount) / lastMonthUsersCount) * 100
        : 0;

    res.status(200).json({
      success: true,
      stats: {
        totalOrders,
        activeOrders,
        successfulPayments,
        totalRevenue,
        revenueChangePercentage: revenueChangePercentage.toFixed(2), // Rounded to 2 decimal places
        revenueTrend, // "up", "down", or "no-change"
        totalProducts,
        stockCount,
        lowStock,
        totalUsers,
        percentageIncrease: percentageIncrease.toFixed(2),
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
