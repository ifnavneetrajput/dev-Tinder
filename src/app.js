const express = require("express")
 const  connectDB = require("./config/database")
const app = express();
const User = require("./models/User")
app.use(express.json());

app.post("/signup", async(req, res) => {
    console.log(req.body)
  const user = new User(req.body);
  try {
    // error handling
   await user.save()
  res.send("user saved succesfully ")
  }
  catch (err) {
    res.status(401).send("something went wrong")
  }
})



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

