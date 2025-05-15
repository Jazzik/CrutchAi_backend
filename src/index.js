require("dotenv").config();
const express = require("express");
const itemRoutes = require("./routes/itemRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World! Express server is running.");
});

// API Routes
app.use("/api/items", itemRoutes);
app.use("/api/auth", authRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  console.log("Environment:", process.env.NODE_ENV || "development");
});
