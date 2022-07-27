const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/gym-app")
  .then(() => {
    console.log("conexão bem sucedida!");
  })
  .catch((error) => {
    console.log("Falha ao conectar-se ao banco", error);
  });
