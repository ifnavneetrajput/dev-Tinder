const mongoose = require("mongoose");

const User = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength:10,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim:true,
    },
    password: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      validation(value) {
        if (!(["male", "female", "other"].includes(value))) {
          throw new Error("gender is not valid")
        }
      }
    },
    gender: {
      type: String,
    },
    photoUrl: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    about: {
      type: String,
      default:"This is a defautlt about"
    },
    skills: {
      type: [String],
      default:["cricket" ,"engineer"]
    }
  },
  {
    timestamps: true,
  }
);

module.exports= mongoose.model("User",User)