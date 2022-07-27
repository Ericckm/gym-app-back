const mongoose = require("mongoose");
const key = process.env.MONGOLOCAL;

mongoose
  .connect(`${key}`)
  .then(() => {
    console.log("conexão bem sucedida!");
  })
  .catch((error) => {
    console.log("Falha ao conectar-se ao banco", error);
  });
