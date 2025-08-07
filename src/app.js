const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors')
const http = require('http');
const initaliseSocket = require("./utils/socket");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials:true
  })
);
app.use(cookieParser());
app.use(express.json());

const authRouter = require("./routes/auth")
const profileRouter= require("./routes/profile")

const requestRouter= require("./routes/request");
const { userRouter } = require("./routes/user");


app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)

const server = http.createServer(app);
initaliseSocket(server);


connectDB()
  .then(() => {
    console.log("database connection is eastablished");
    server.listen(7777, () => {
      console.log("This port is running on 7777");
    });
  })
  .catch(() => {
    console.log("database connection is not eastablished");
  });
