const express = require("express");
const router = express.Router();
const { getAdminStats } = require("../controllers/adminStatsController");
const adminMiddleware = require("../middlewares/admin");
const authMiddleware = require("../middlewares/auth");

// Admin stats route (accessible only by admins)
router.get("/stats", getAdminStats);

module.exports = router;
