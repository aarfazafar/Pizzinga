const express = require("express");
const router = express.Router();
const User = require("../models/User");

const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = "HeyThisIsMyProjectWorkOfOIBSIPLevel3"
router.post(
  "/userlogin",
  body("email", "invalid email").isEmail(),
  body("password", "Password must be of at least 5 characters").isLength({
    min: 5,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
  }

    const {email, password }= await req.body;
    try {
      let userData = await User.findOne({ email });
      // console.log(userData)
      if (!userData) {
        return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
    }

    const comparePassword = await bcrypt.compare(password, userData.password)
      if (!comparePassword) {
        return res.status(400).json({ errors: "Incorrect Password" });
      }
      const data = {
        user:{
          id:userData.id
        }
      }
      const authToken = jwt.sign(data, jwtSecret)
      return res.json({ success: true, authToken:authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;