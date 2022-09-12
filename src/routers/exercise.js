const express = require("express");
const auth = require("../middleware/auth");
const Exercise = require("../models/exercise");
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
