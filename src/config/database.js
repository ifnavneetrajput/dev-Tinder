const mongoose = require("mongoose")


const connectDB = async() => {
 await  mongoose.connect(
    "mongodb+srv://navneetrajput404:AN1QVSqB6mqU7KoV@devtinder.p9pnk.mongodb.net/"
  );
}


module.exports = connectDB;