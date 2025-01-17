const express = require("express")

const app = express();

app.use(
  "/user",
  // you can wrap these functions inside array
  // there will be an error if you respond with multiple response
  (req, res ,next) => {
    console.log("1st handler")
    //  res.send("1st handler")
    next();
  },
  (req, res) => {
        console.log("2st handler");
      res.send("2st handler");
  }
);

app.listen(7777, () => {
  console.log("This port is running on 7777")
})