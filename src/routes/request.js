const express = require("express");

const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequestSchema");
const User = require("../models/User");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // validation for status
      const allowedStatus = ["ignored", "interested", "accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.send(`message:Invalid status type` + status);
      }

      const toUser = await User.findById(toUserId);

      if (!toUser) {
        return res.status(404).json({ message: "user not found" });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          {
            fromUserId,
            toUserId,
          },
          {
            toUserId,
            fromUserId,
          },
        ],
      });

      if (existingConnectionRequest) {
        return res.status(400).send("connection request already exist");
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      res.json({
        message: `${req.user.firstName} send connection request to ${toUser.firstName}`,
        data,
      });
    } catch (err) {
      res.status(400).send("error:" + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        return res.status(404).json({ message: "Status not allowed" });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "No such connection request found" });
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.send({ message: "connection status :" + status, data })

    } catch (err) {
      res.status(404).send("error is :", err.message);
    }
  }
);

module.exports = requestRouter;
