const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");



app.use(cookieParser());
app.use(express.json());

const authRouter = require("./routes/auth")
const profileRouter= require("./routes/profile")

const requestRouter= require("./routes/request");
const { userRouter } = require("./routes/user");

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/",userRouter)
connectDB()
  .then(() => {
    console.log("database connection is eastablished");
    app.listen(7777, () => {
      console.log("This port is running on 7777");
    });
  })
  .catch(() => {
    console.log("database connection is not eastablished");
  });
