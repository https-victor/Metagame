const keys = require("../keys");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  const secret = req.header("secret-key");

  // Check for token
  if (!token) {
    res.status(401).json({ error: { msg: "No token, authorization denied" } });
  }
  if (secret === keys.JWT) {
    next();
  } else {
    try {
      // Verify token
      const decoded = jwt.verify(token, keys.JWT);

      // Add user from payload;
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).json({ error: { msg: "Token is not valid" } });
    }
  }
}

module.exports = auth;
