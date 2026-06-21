const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED } = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(UNAUTHORIZED).send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload; // declare outside

  try {
    payload = jwt.verify(token, JWT_SECRET); // assign inside try
  } catch (err) {
    return res.status(UNAUTHORIZED).send({ message: "Invalid token" });
  }

  req.user = payload;
  next();
};
