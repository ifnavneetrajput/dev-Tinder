const mongoose = require("mongoose")

const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequestSchema");
const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status:"interested"
    }).populate("fromUserId",["firstName","lastName"]);

    res.json({
      message: "Data fetched sussefully ",
      data:connectionRequest
    })
    
  }
  catch (err) {
    res.status(400).send("ERROR :" +err.message)
  }
})

module.exports = {
  userRouter,
}