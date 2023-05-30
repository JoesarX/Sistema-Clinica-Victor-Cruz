import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import expedientesRouter from "./routes/expedientes.js"

import usuariosRouter from "./routes/usuarios.js"
import adminRouter from "./routes/usuarios_admin.js"

const app = express();
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});

//LOCALHOST MYSQL CONNECTION
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "softwaredb",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

//HEROKU MYSQL CONNECTION
const pool = mysql.createPool({
  host: "us-cdbr-east-06.cleardb.net",
  user: "b3d6146967a4b4",
  password: "ea90b0e8",
  database: "heroku_9fb29a24254053e",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello this is the backend!");
});

app.use("/expedientes", expedientesRouter(pool)); // Pass the pool object as a parameter


app.use("/usuarios", usuariosRouter(pool)); // Pass the pool object as a parameter
app.use("/usuarios_admin", adminRouter(pool)); // Pass the pool object as a parameter
