const mongoose = require("mongoose");
const KEY = process.env.MONGOLOCAL;

mongoose
  .connect(`${KEY}`)
  .then(() => {
    console.log("conexão bem sucedida!");
  })
  .catch((error) => {
    console.log("Falha ao conectar-se ao banco", error);
  });
