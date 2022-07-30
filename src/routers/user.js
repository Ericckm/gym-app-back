const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const auth = require("../middleware/auth");

router.post("/register", async (req, res) => {
  const user = new User(req.body);
  try {
    const token = await user.generateAuthToken();
    await user.save();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/login", auth, async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).json();
  }
});

module.exports = router;
