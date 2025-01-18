const express = require("express")

const app = express();

const { adminAuth } = require("./middlewares/auth")
// means we need middlewares for authorisation or it act just like a condition to furher route handlers at a single place
app.get("/admin", adminAuth, (req,res) => {
  res.send("admin entered")
})
app.listen(7777, () => {
  console.log("This port is running on 7777")
})