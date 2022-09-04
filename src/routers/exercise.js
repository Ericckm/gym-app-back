const express = require("express");
const auth = require("../middleware/auth");
const Exercise = require("../models/exercise");
const Log = require("../models/log");
const User = require("../models/user");
const router = new express.Router();

// GET ALL EXERCISES BY AUTHENTICATED USER ID
router.get("/exercise", auth, async (req, res) => {
  const exerciseByUser = await User.findById(req.user._id);
  await exerciseByUser.populate("exercise");
  const userWithExercise = { ...exerciseByUser };
  const exercisesFromUser = userWithExercise.$$populatedVirtuals.exercise;

  res.status(200).send(exercisesFromUser);
});

// GET ALL EXERCISES LIKED FROM AUTHENTICATED USER ID
router.get("/exerciseLiked", auth, async (req, res) => {
  const exerciseByUser = await User.findById(req.user._id);
  await exerciseByUser.populate("exercise");
  const userWithExercise = { ...exerciseByUser };
  const exercisesFromUser = userWithExercise.$$populatedVirtuals.exercise;
  const filteredExercises = await exercisesFromUser.filter(
    (i) => i.liked === true
  );
  res.status(200).send(filteredExercises);
});

// GET ALL EXERCISES EXECPT LIKED
router.get("/exercises", auth, async (req, res) => {
  const exerciseByUser = await User.findById(req.user._id);
  await exerciseByUser.populate("exercise");
  const userWithExercise = { ...exerciseByUser };
  const exercisesFromUser = userWithExercise.$$populatedVirtuals.exercise;
  const filteredExercises = await exercisesFromUser.filter(
    (i) => i.liked === false
  );
  res.status(200).send(filteredExercises);
});

//GET ALL LOGS FROM EXERCISE ID
router.get("/exercise/:id", auth, async (req, res) => {
  const _id = req.params.id;
  const exercise = await Exercise.findById(_id);
  await exercise.populate("log");
  const exerciseWithLogs = { ...exercise };
  const exerciseWithLogsClean = exerciseWithLogs.log;
  res.status(200).send(exerciseWithLogsClean);
});

// POST EXERCISE
router.post("/exercise", auth, async (req, res) => {
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

// router.get("/exercise/:id/logs", async (req, res) => {
//   const _id = req.params.id;

//   try {
//     const logs = await Log.find({ exerciseId: _id });
//     return res.send(logs);
//   } catch (e) {
//     res.status(500).send();
//   }
// });

// router.patch("/exercise/:id", async (req, res) => {
//   console.log(req.body);
//   const _id = req.params.id;
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["name", "videoUrl", "type", "liked", "id"];
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );

//   if (!isValidOperation) {
//     return res.status(400).send({ error: "Invalid update!" });
//   }

//   try {
//     const exercise = await Exercise.findById(_id);

//     if (!exercise) {
//       return res.status(404).send();
//     }

//     updates.forEach((update) => (exercise[update] = req.body[update]));
//     await exercise.save();
//     res.send(exercise);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

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

module.exports = router;
