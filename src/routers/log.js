const express = require("express");
const auth = require("../middleware/auth");
const Log = require("../models/log");
const router = new express.Router();

// POST LOG REQUIRE EXERCISEOWNER FIELD
router.post("/log", auth, async (req, res) => {
  const log = new Log({
    ...req.body,
  });

  try {
    await log.save();
    res.status(201).json(log);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
