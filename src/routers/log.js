const express = require("express");
const auth = require("../middleware/auth");
const Log = require("../models/log");
const router = new express.Router();
const Exercise = require("../models/exercise");

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

//GET LAST LOG FROM EXERCISE ID
router.get("/exercise/:id", auth, async (req, res) => {
  const id = req.params.id;
  const exercise = await Exercise.findById(id).populate({ path: "logs" });
  const logs = exercise.logs;
  const lastLog = logs.slice(-1);
  res.status(200).send(...lastLog);
});

//GET ALL LOGS FROM EXERCISE ID
router.get("/exercise/logs/:id", auth, async (req, res) => {
  const id = req.params.id;
  const exercise = await Exercise.findById(id).populate({ path: "logs" });
  const logs = exercise.logs;
  const lastLog = logs.slice(-5);
  res.status(200).send(lastLog);
});

module.exports = router;
