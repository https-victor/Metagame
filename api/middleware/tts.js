const keys = require("../keys");
const jwt = require("jsonwebtoken");

function tts(req, res, next) {
  const { token } = req.body;

  // Check for token
  if (!token) {
    return res
      .status(401)
      .json({ error: { msg: "No token, authorization denied" } });
  }
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

module.exports = tts;
