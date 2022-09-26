const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const auth = require("../middleware/auth");
const axios = require("axios");
const { initialExercisesDB } = require("../../initialSetup");

router.post("/register", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();

    await initialExercisesDB.forEach((obj) => {
      axios.post(`http://localhost:2500/addExercise`, obj, {
        headers: {
          Authorization: token,
        },
      });
    });

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.patch("/userUpdate", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "weight", "height", "password"];
  const isValid = updates.every((update) => allowedUpdates.includes(update));
  if (!isValid) {
    return res.status(400).send({ error: "Invalid update" });
  }
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.status(201).send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
