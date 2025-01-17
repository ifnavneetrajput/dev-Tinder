const express = require("express")
 const  connectDB = require("./config/database")
const app = express();
const User = require("./models/User")
app.use(express.json());

app.post("/signup", async(req, res) => {
   
  const user = new User(req.body);
  try {
    // error handling
   await user.save()
  res.send("user saved succesfully ")
  }
  catch (err) {
    res.status(401).send("something went wrong"+err.message)
  }
})
// get user by email
app.get("/user", async (req, res) => {
      const userEmail = req.body.email; 
  try {

    const users = await User.find({ email: userEmail })
    if (users.length===0) {
     res.status(401).send("user not found");
    }
    else {
        res.send(users);
    }
 
  }
  catch (err) {
    res.status(401).send("something went wrong")
  }
})

//get all user for feed

app.get("/feed", async (req, res) => {

  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
     res.status(401).send("something went wrong");
  }
})

// delete an document by id

app.delete("/user", async(req, res) => {
  const userId = req.body.userId
  try {
    const user = await User.findByIdAndDelete(userId)
    res.send("user deleted successfully")
  } catch (err) {
    res.status(401).send("something went wrong");
  }
})

/// update data of user

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId
  const data = req.body
  try {

    const ALLOWED_UPDATES = ["skills", "age", "about" ,"gender"]
    const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k))
    if (!isUpdateAllowed) {
      throw new Error("update not allowed")
    }

    if (data?.skills.length > 10) {
      throw new Error("skills cannot be more than 10")
    }

    const user = await User.findByIdAndUpdate(
      userId,
      data,
      { returnDocument: "before" },
      { runValidators: true }
    );
  
    res.send("data updated successfully")
  }
  catch (err) {
    res.status(401).send("something went wrong: "+err.message);
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

