import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

//using nodemon as script in package.json, so we don't have to restart the server every time we make a change
// "npm start" to run the server and ctrl+c to stop it
app.listen(8000, ()=>{
    console.log("Server is running on port 8000!")
})

//if any auth issues, run this in mysql workbench:
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "softwaredb"
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res)=>{
    res.send("Hello this is the backend!")
})

app.get("/pacientes", (req, res)=>{
    const sqlSelect = "SELECT * FROM pacientes"
    db.query(sqlSelect, (err, data)=>{
        if(err) return res.send(err)
        return res.json(data)
    })
})

app.post("/pacientes", (req, res)=>{
    const q = "INSERT INTO pacientes (`nombre_completo`, `estado_civil`, `edad`, `correo`, `telefono`, `direccion`, `numero_identidad`, `padecimientos`) VALUES (?)"
    const values = [
        req.body.nombre_completo,
        req.body.estado_civil,
        req.body.edad,
        req.body.correo,
        req.body.telefono,
        req.body.direccion,
        req.body.numero_identidad,
        req.body.padecimientos
    ]
    db.query(q, [values], (err, data)=>{
        if(err) return res.send(err)
        return res.json("Paciente añadido exitosamente!")
    })
})

