const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized. Token not provided." });
  }

  jwt.verify(token, "12345678", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden. Invalid token." });
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = authenticateUser;
