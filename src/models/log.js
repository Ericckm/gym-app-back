const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    load: {
      type: Number,
      required: true,
    },
    sets: {
      type: Number,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    rest: {
      type: Number,
      required: true,
    },
    exerciseOwner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Exercise",
    },
  },
  {
    timestamps: true,
  }
);

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
