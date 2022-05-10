const jwt = require("jsonwebtoken");
const db = require("../routes/conn");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send({ error: "Access denied. No token provided." });

  try {
    const payload = jwt.verify(token, "jwtPrivateKey");
    req.payload = payload;
    db.getUser(payload._id).then(user => {
      if (payload._id.toString() === user._id.toString() && payload.first_name === user.first_name && payload.email === user.email){
        next();
      } else {
        res.status(400).send({ error: "Invalid token." });
      }
    })
  } catch (err) {
    res.status(400).send({ error: "Invalid token." });
  }
};
