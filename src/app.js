const express = require("express")

const app = express();

// app.use("/navneet", (req, res) => {
//   res.send("hello i am from port 7777 navneet");
// });
// app.use("/virat", (req, res) => {
//   res.send("hello i am from port 7777 virat kholi");
// });


// app.use('/test',(req, res) => {
//       res.send('hello i am from port 7777')
// })

// app.use("/user/:userId", (req, res) => {

//   res.send("hahahahaha")
// })

app.get("/user/:userId", (req, res) => {
    console.log("userId is", req.params);
  res.send("user get api successful");
});

app.post("/user", (req, res) => {
  // write logic to save data to database
  res.send("user post api succesful")
})

app.delete("/user", (req, res) => {
  res.send("user deleted successfully")
})
app.listen(7777, () => {
  console.log("This port is running on 7777")
})