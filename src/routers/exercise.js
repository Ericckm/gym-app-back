const express = require("express");
const auth = require("../middleware/auth");
const Exercise = require("../models/exercise");
const Log = require("../models/log");
const User = require("../models/user");
const router = new express.Router();

// GET EXERCISES LIKED FROM AUTH USER
router.get("/exerciseLiked", auth, async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "exercises",
  });
  const exercises = user.exercises;
  const filteredExercises = await exercises.filter((i) => i.liked === true);

  res.status(200).send(filteredExercises);
});

// GET EXERCISES NOT LIKED FROM AUTH USER
router.get("/exercises", auth, async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "exercises",
  });
  const exercises = user.exercises;
  const filteredExercises = await exercises.filter((i) => i.liked === false);

  res.status(200).send(filteredExercises);
});

// POST EXERCISE
router.post("/addExercise", auth, async (req, res) => {
  const exercise = new Exercise({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await exercise.save();
    res.status(201).send({ exercise });
  } catch (e) {
    res.status(400).send(e);
  }
});

// UPDATE EXERCISE LIKED
router.put("/exercise/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const exercise = await Exercise.findById(_id);
    exercise.liked = !exercise.liked;
    await exercise.save();
    res.status(201).send(exercise);
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET ALL EXERCISES THAT INCLUDES LOGS FROM AUTHENTICATED USER ID
router.get("/exerciseWithLogs", auth, async (req, res) => {
  const logs = await Log.find();
  const user = req.user;

  const uniqueExecIdMap = {};
  for (const log of logs) {
    uniqueExecIdMap[log.exerciseOwner] = log;
  }
  const uniqueExercises = Object.values(uniqueExecIdMap);

  const exercises = await Exercise.find({
    _id: {
      $in: uniqueExercises.map((log) => log.exerciseOwner),
    },
  });

  const execUser = await exercises.filter((exec) => exec.owner == user.id);

  res.status(200).send(execUser);
});

module.exports = router;

// router.delete("/exercise/:id", async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const exercise = await Exercise.findById(_id);
//     await exercise.remove();
//     res.send({ data: true });
//   } catch {
//     res.status(404).send({ error: "Exercise not found" });
//   }
// });
