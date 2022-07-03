const jwt = require("jsonwebtoken")
const config = require("config")

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token")

  // Check if no token is present
  if (!token) {
    return res.status(401).json({ msg: "No token found! Authorization Denied" })
  }

  // Verify token if it exits
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"))

    // Assign token to user
    req.user = decoded.user
    next()
  } catch (err) {
    res.status(401).json({ msg: "Token is Not Valid" })
  }
}
