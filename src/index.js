const app = require("./app");
const port = process.env.PORT;

app.listen(port, () => {
  console.log("App rodando na porta ", +port);
});

// const Exercise = require("../src/models/exercise");
// const User = require("./models/user");
// const Log = require("./models/log");

// const main = async () => {
//   const exercise = await Exercise.findById("62f69adb934a6d2d85cc2e3a");
//   console.log(exercise);
//   const user = await User.findById("62f69a4d934a6d2d85cc2e33");
//   await user.populate("exercise");
//   console.log(user.exercise);
//   const exercise = await Log.findById("62f69adb934a6d2d85cc2e3a");
//   console.log(exercise);
// const user = await User.findById("62f69a4d934a6d2d85cc2e33").populate(
//   "exercise"
// );
// console.log(user.exercise);
// };

// main();
