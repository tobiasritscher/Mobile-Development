const express = require("express");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const db = require("../routes/conn");
const encryption = require("../routes/encryption");
const validateWith = require("../middleware/validation");

const schema = {
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
};

router.post("/", validateWith(schema), (req, res) => {
  const { email, password } = req.body;
  db.getUserByEmail(email).then(function(user){
    if (!user || !encryption.comparePassword(password,user.password))
      return res.status(400).send({ error: "Invalid email or password." });

    const token = jwt.sign(
        { _id: user._id, first_name: user.first_name, email: email },
        "jwtPrivateKey"
    );
    res.send(token);
  })
});

module.exports = router;