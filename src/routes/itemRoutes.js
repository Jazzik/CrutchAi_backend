const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

// GET /api/items
router.get("/", itemController.getItems);

module.exports = router;
