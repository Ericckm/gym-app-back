const mongoose = require("mongoose");
const KEY = process.env.MONGOLOCAL;

mongoose
  .connect(`${KEY}`)
  .then(() => {
    console.log("Success connecting to DB!");
  })
  .catch((error) => {
    console.log("Failure connecting to DB", error);
  });
