const express = require("express");
const Exercise = require("../models/exercise");
const Log = require("../models/log");
const router = new express.Router();

router.get("/exercise", async (req, res) => {
  const exerciseList = await Exercise.find();
  res.send(exerciseList);
});

router.get("/exercise/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const exercise = await Exercise.findById(_id);
    const logs = await Log.find({ exerciseId: _id });
    const exerciseWithLogs = { ...exercise.toObject(), logs };
    // exercise.logs = logs
    if (exercise) {
      return res.send(exerciseWithLogs);
    }
    console.log(exerciseWithLogs);
    res.status(404).send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/exercise/:id/logs", async (req, res) => {
  const _id = req.params.id;

  try {
    const logs = await Log.find({ exerciseId: _id });
    return res.send(logs);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/exercise", async (req, res) => {
  console.log(req.body);
  const exercise = new Exercise(req.body);

  try {
    await exercise.save();
    res.status(201).json(exercise);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.patch("/exercise/:id", async (req, res) => {
  console.log(req.body);
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "videoUrl", "type", "liked", "id"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid update!" });
  }

  try {
    const exercise = await Exercise.findById(_id);

    if (!exercise) {
      return res.status(404).send();
    }

    updates.forEach((update) => (exercise[update] = req.body[update]));
    await exercise.save();
    res.send(exercise);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put("/exercise/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const exercise = await Exercise.findById(_id);
    exercise.liked = !exercise.liked;
    await exercise.save();
    console.log(exercise);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/exercise/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const exercise = await Exercise.findById(_id);
    await exercise.remove();
    res.send({ data: true });
  } catch {
    res.status(404).send({ error: "Exercise not found" });
  }
});

module.exports = router;
