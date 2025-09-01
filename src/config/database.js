const mongoose = require("mongoose")


const connectDB = async () => {
   console.log("MONGODB:", process.env.MONGODB);
  await mongoose.connect(process.env.MONGODB);
}


module.exports = connectDB;