const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/User");
const { validationSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken");
app.use(cookieParser())
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    // validation
    validationSignupData(req);

    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.send("user saved succesfully ");
  } catch (err) {
    res.status(401).send("something went wrong : " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(password, passwordHash);
    if (isPasswordValid) {
      // create a jwt token


      const token = await jwt.sign({_id:user._id} ,"DEV@TINDER$47")
      // add the token to cookie and send the response back to the user
      res.cookie("token", token);

      res.send("login successful !!!");
    }
  } catch (err) {
    res.status(401).send("something went wrong : " + err.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid token")
    }

    // validate my token 
    const decodedeMessage = await jwt.verify(token, "DEV@TINDER$47");
    console.log(decodedeMessage)
    const { _id } = decodedeMessage
    
    console.log("Logged in user is :", _id)
    
    const user = await User.findById(_id)
    if (!user) {
      throw new Error("user does not exist in database")
    }
    res.send(user)
  //  console.log(token);
   // res.send("profile accessed suceesfully");
  } catch (err) {
    res.status(401).send("something went wrong : " + err.message);
  }
});

// get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const users = await User.find({ email: userEmail });
    if (users.length === 0) {
      res.status(401).send("user not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(401).send("something went wrong");
  }
});

//get all user for feed

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(401).send("something went wrong");
  }
});

// delete an document by id

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (err) {
    res.status(401).send("something went wrong");
  }
});

/// update data of user

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["skills", "age", "about", "gender"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }

    if (data?.skills.length > 10) {
      throw new Error("skills cannot be more than 10");
    }

    const user = await User.findByIdAndUpdate(
      userId,
      data,
      { returnDocument: "before" },
      { runValidators: true }
    );

    res.send("data updated successfully");
  } catch (err) {
    res.status(401).send("something went wrong: " + err.message);
  }
});

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
