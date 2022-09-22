const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    liked: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

exerciseSchema.virtual("logs", {
  ref: "Log",
  localField: "_id",
  foreignField: "exerciseOwner",
});

module.exports = Exercise;
