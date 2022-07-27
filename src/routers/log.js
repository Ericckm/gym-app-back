const express = require("express");
const Log = require("../models/log");
const router = new express.Router();

router.get("/logs", async (req, res) => {
  const logList = await Log.find().populate("exerciseId").exec();

  logList.map((log) => {
    const empty = [];
    const idExerc = log.exerciseId._id;

    console.log(empty);
  });

  // logList.forEach(function (log) {
  //   const idEx = log.exerciseId._id.toString();

  //   console.log("idEx:", idEx);
  //   const logId = log._id.toString();
  //   response[idEx] = log;
  // });
  res.send(logList);
});

router.post("/log", async (req, res) => {
  if (!req.body.exerciseId) {
    res.status(400).send({ message: "missing exercise id in body" });
    return;
  }

  console.log(req.body);
  const log = new Log({
    load: req.body.load,
    repetition: req.body.repetition,
    series: req.body.series,
    exerciseId: req.body.exerciseId,
    obs: req.body.obs,
  });

  try {
    await log.save();
    res.status(201).send(log);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
