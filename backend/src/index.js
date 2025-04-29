const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 7000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());

// database connection
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Serve static files from the React frontend
app.use(express.static(path.join(__dirname, "../frontend/dist"))); // or 'build' if you're using create-react-app

// Catch-all to return index.html for client-side routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
