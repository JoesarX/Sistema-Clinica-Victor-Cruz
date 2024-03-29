import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import nodemailer from "nodemailer";

import expedientesRouter from "./routes/expedientes.js"
import usuariosRouter from "./routes/usuarios.js"
import adminRouter from "./routes/usuarios_admin.js"
import medicamentosRouter from "./routes/medicamentos.js";
import citasRouter from "./routes/citas.js";
import categoriesRouter from "./routes/categories.js";
import textos_cmdRouter from "./routes/textos_cmd.js";
import ServiciosRouter from "./routes/servicios.js";
import CarruselRouter from "./routes/carrusel.js";
import AboutUsRouter from "./routes/aboutus.js";
import ExamenesRouter from "./routes/examenes.js"
import RecetasRouter from "./routes/recetas.js";
import PagosRouter from "./routes/pagos.js";
import serviciosRouter from "./routes/servicios.js";
import KeysRouter from "./routes/keys.js";
import ArchivosRouter from "./routes/archivos.js";
import preciosRouter from "./routes/precios.js";
import facturasRouter from "./routes/facturas.js";
import adminDashboardRouter from "./routes/adminDashboard.js";

import expedientesMedRouter from "./routes/expedienteMed.js";
import expedientesAlergiaRouter from "./routes/expedienteAlergia.js";
import expedientesEnfermedadesRouter from "./routes/expedienteEnfermedad.js";

const app = express();
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});

//LOCALHOST MYSQL CONNECTION
/*const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "softwaredb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});*/

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

app.use("/categorias", categoriesRouter(pool)); // Pass the pool object as a parameter

app.use('/servicios', ServiciosRouter(pool));
app.use('/texto_cmd', textos_cmdRouter(pool));
app.use('/carrusel', CarruselRouter(pool));
app.use('/aboutus', AboutUsRouter(pool));
app.use('/keys', KeysRouter(pool));
app.use('/archivos', ArchivosRouter(pool));
app.use('/examenes', ExamenesRouter(pool));

app.use('/recetas', RecetasRouter(pool));
app.use('/pagos', PagosRouter(pool));
app.use('/precios', preciosRouter(pool));
app.use('/facturas', facturasRouter(pool, transporter));

app.use('/adminDashboard', adminDashboardRouter(pool, transporter));

app.use('/expediente_med', expedientesMedRouter(pool, transporter));
app.use('/expedientes_alergia', expedientesAlergiaRouter(pool, transporter));
app.use('/expedientes_enfermadad', expedientesEnfermedadesRouter(pool, transporter));