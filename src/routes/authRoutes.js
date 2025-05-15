const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Initiate Google OAuth flow
router.get("/google", authController.googleLogin);

// Handle OAuth callback
router.get("/callback", authController.handleCallback);

module.exports = router;
