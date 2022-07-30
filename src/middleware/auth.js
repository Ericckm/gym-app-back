const jwt = require("jsonwebtoken");
const User = require("../models/user");

const KEY = process.env.JWTPASSKEY;

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, KEY);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    console.log(user);

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;
