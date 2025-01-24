const validator = require("validator")

const validationSignupData = (req) => {
  const { firstName, lastName, email, password } = req.body
  
  if (!firstName || !lastName) {
    throw new Error("enter names correctlly")
  }
  if (!validator.isEmail(email)) {
    throw new Error("enter a valid email")
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("enter a strong password")
  }
}

const validEditProfileData=(req) => {
  const allowedEditField = ["firstName", "lastName", "skills", "about"]
  
  const isEditAllowed = Object.keys(req.body).every((field) => allowedEditField.includes(field));
  return isEditAllowed;
}

module.exports = {
  validationSignupData,
  validEditProfileData,
}