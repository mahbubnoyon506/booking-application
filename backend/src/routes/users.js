const express = require("express");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/user");

const router = express.Router();

// "/api/users/register"
router.post(
  "/register",
  [
    check("firstName", "Firstname is required").isString(),
    check("lastName", "Lastname is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Passowd with 6 or more character required").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ message: "User already exists." });
      }

      user = new User(req.body);
      await user.save();

      if (!process.env.JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET_KEY is not defined");
      }

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
  }
);

module.exports = router;
