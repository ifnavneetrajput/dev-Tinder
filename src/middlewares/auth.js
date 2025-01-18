const adminAuth = (req,res,next) => {
  console.log("auth is verified")
  const token = "xyz"
  const isAdmin = token === "xyzg";
  if (!isAdmin) {
    res.status(401).send("admin not authorised")
  }
  else {
    next();
  }
}

module.exports = {
  adminAuth
}