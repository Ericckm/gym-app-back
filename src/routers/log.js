const express = require("express");
const auth = require("../middleware/auth");
const Log = require("../models/log");
const router = new express.Router();

// router.get("/logs", auth, async (req, res) => {
//   const logList = await Log.find().populate("exerciseId").exec();

//   logList.map((log) => {
//     const empty = [];
//     const idExerc = log.exerciseId._id;

//     console.log(empty);
//   });

//   res.send(logList);
// });

router.post("/log", auth, async (req, res) => {
  const log = new Log({
    ...req.body,
  });
  console.log(req.body);

  try {
    await log.save();
    res.status(201).json(log);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
