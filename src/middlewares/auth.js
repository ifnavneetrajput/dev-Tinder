const  jwt  = require("jsonwebtoken")
const User = require("../models/User")

const userAuth = async (req, res ,next) => {
 try {
   const { token } = req.cookies;
   if (!token) {
     throw new Error("token is invalid")
   }

   const decodedeObj = await jwt.verify(token, "DEV@TINDER$47");
   const { _id } = decodedeObj;
   const user = await User.findById(_id)
   if (!user) {
     throw new Error("user not found")
   }
   req.user=user
   next();
 } catch (err) {
   res.status(401).send("something went wrong : " + err.message);
 }
}

module.exports = {
  userAuth
}