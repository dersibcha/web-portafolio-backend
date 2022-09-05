const express = require("express");
require("dotenv").config();
const cors = require("cors");
const middlewares = require("./middlewares/middlewares");

//console.log(process.env); imprimir variables de env

const app = express();

//Directorio publico
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(middlewares.setHeaders);

app.use("/api/github", require("./routes/git"));
app.use("/api/sendgrid", require("./routes/sendgrid"));

app.listen(process.env.PORT, () => {
  console.log("servidor corrinedo en puerto 4000");
});
