const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bycrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


const jwt_key = "" + process.env.JWT_SECRET;

// create a User using: POST "/api/auth/createuser" . Doesn't require login
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name.").isLength({ min: 3 }),
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password must be atleast 5 characters.").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // if there are errors return Bad Request, and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // check whether the user with same email exist or not
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "User with this email already exists." });
      }

      // creating secure hash password using bycryptjs - (password + salt)
      const salt = await bycrypt.genSalt(10);
      const secPass = await bycrypt.hash(req.body.password, salt);
      // create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user:{
          id: user.id
        }
      }
      const authToken = jwt.sign(data, jwt_key);

      res.json({authToken}) 
    } 
    catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

module.exports = router;
