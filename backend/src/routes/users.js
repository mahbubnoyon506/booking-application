const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// "/api/users/register"
router.post("/register", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "User already exists." });
    }

    user = new User(req.body);
    await user.save();

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000, // 1 day
    });

    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
});

module.exports = router;
