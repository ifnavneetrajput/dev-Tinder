const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const UserSchema =  new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 10,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong");
        }
      },
    },

    age: {
      type: Number,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("gender is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("photo Url is not valid");
        }
      },
    },
    about: {
      type: String,
      default: "This is a defautlt about",
    },
    skills: {
      type: [String],
      default: ["cricket", "engineer"],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_STRING, {
    expiresIn: 60 * 60,
  });
  return token;
};

UserSchema.methods.validatePassword = async function (passwordInputBYUser) {
  const user = this 
  const passwordHash = user.password

  const isPasswordValid = await bcrypt.compare(
    passwordInputBYUser,
    passwordHash
  );
  return isPasswordValid;

}

module.exports = mongoose.model("User", UserSchema);
