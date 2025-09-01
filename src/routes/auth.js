const express = require("express")

const authRouter = express.Router()
const { validationSignupData } = require("../utils/validation");
const User = require("../models/User");
const bcrypt = require("bcrypt");


authRouter.post("/signup", async (req, res) => {
  try {
    // validation
    validationSignupData(req);

    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    const savedUser = await user.save();
     const token = await savedUser.getJWT();

     res.cookie("token", token, {
       expires: new Date(Date.now() + 8 * 3600000),
     });
    
    res.json({message:"user saved succesfully " ,data:savedUser});
  } catch (err) {
    res.status(401).send("something went wrong : " + err.message);
  }
});



authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        httpOnly: true,
          secure: true,       
        sameSite: "none",
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send(user);
    }
  } catch (err) {
    res.status(401).send("something went wrong : " + err.message);
  }
});


authRouter.post("/logout", async (req, res) => {
  // you might need to clean up things here
  res.cookie("token", null), {
    expires:new Date(Date.now())
  }
  res.send("logout successful")
})
module.exports = authRouter;
