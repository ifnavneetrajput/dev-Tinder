const express = require("express")
 const  connectDB = require("./config/database")
const app = express();
const User = require("./models/User")


app.post("/signup", async(req, res) => {

  const user = new User({
    firstName: "Navneet ",
    lastName: "RAjput",
    email: "navneetrajput404@gmail.com",
    password: "Navn@123",
    age: 20,
    gender:"Male"
    
  });
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

