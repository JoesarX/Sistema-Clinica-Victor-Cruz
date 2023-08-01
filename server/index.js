import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import expedientesRouter from "./routes/expedientes.js"
import usuariosRouter from "./routes/usuarios.js"
import adminRouter from "./routes/usuarios_admin.js"
import medicamentosRouter from "./routes/medicamentos.js";
import citasRouter from "./routes/citas.js";
import categoriesRouter from "./routes/categories.js";
import nodemailer from "nodemailer";

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

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.net",
  port: 465,
  secure: true,
  auth: {
    user: 'ClinicaVictorCruz@gmail.com',
    pass: 'hljvucilzplqaedf'
  }
});

//HEROKU MYSQL CONNECTION
const pool = mysql.createPool({
  host: "us-cdbr-east-06.cleardb.net",
  user: "b3d6146967a4b4",
  password: "ea90b0e8",
  database: "heroku_9fb29a24254053e",
  waitForConnections: true,
  connectionLimit: 15,
  queueLimit: 0,
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello this is the backend! HOSTED ON AZURE! AUTO DEPLOYED!");
});

app.use("/expedientes", expedientesRouter(pool)); // Pass the pool object as a parameter

app.use("/usuarios", usuariosRouter(pool)); 
app.use("/usuarios_admin", adminRouter(pool)); 

app.use("/medicamentos", medicamentosRouter(pool)); 

app.use("/citas", citasRouter(pool, transporter)); 
app.use("/medicamentos", medicamentosRouter(pool)); // Pass the pool object as a parameter
app.use("/categorias", categoriesRouter(pool)); // Pass the pool object as a parameter



