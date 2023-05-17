import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import pacientesRouter from "./routes/pacientes.js"

const app = express();

app.listen(8000, () => {
  console.log("Server is running on port 8000!");
});

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "softwaredb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello this is the backend!");
});

app.use("/pacientes", pacientesRouter(pool)); // Pass the pool object as a parameter
