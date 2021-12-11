const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const postLogin = async function (req, res) {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return { status: "error", error: "Invalid login" };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "Secret1234!"
    );
    console.log(user, token);
    return res.json({ status: "ok", user: token });
  } else {
    return res.status(401).json({ status: "error", user: false });
  }
};

module.exports = postLogin;
