const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Initiate Google OAuth flow
router.get("/google", authController.googleLogin);

// Handle OAuth callback
router.get("/callback", authController.handleCallback);

// Protected route example - requires authentication
router.get('/me', authController.verifyToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
