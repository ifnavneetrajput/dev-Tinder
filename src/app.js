const express = require("express")

const app = express();

app.use("/navneet", (req, res) => {
  res.send("hello i am from port 7777 navneet");
});
app.use("/virat", (req, res) => {
  res.send("hello i am from port 7777 virat kholi");
});


app.use('/test',(req, res) => {
      res.send('hello i am from port 7777')
})

app.listen(7777, () => {
  console.log("This port is running on 7777")
})