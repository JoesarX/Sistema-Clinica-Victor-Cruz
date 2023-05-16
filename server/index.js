import express from "express"
import mysql from "mysql2/promise" // Import mysql2/promise instead of mysql
import cors from "cors"

const app = express()

//using nodemon as script in package.json, so we don't have to restart the server every time we make a change
// "npm start" to run the server and ctrl+c to stop it
app.listen(8000, ()=>{
    console.log("Server is running on port 8000!")
})

//if any auth issues, run this in mysql workbench:
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'

// Create a connection pool
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "softwaredb",
    waitForConnections: true, // Whether the pool should wait for connections to become available if the pool is full
    connectionLimit: 10, // Maximum number of connections to create at once
    queueLimit: 0 // Maximum number of connection requests the pool will queue before returning an error
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res)=>{
    res.send("Hello this is the backend!")
})

app.get("/pacientes", async (req, res)=>{ // Change to an async function
    try {
        // Get a connection from the pool
        const connection = await pool.getConnection()
        
        // Execute the query
        const sqlSelect = "SELECT * FROM pacientes"
        const [rows, fields] = await connection.query(sqlSelect)
        
        // Release the connection back to the pool
        connection.release()

        res.json(rows)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

app.post("/pacientes", async (req, res)=>{ // Change to an async function
    try {
        // Get a connection from the pool
        const connection = await pool.getConnection()

        // Execute the query
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
        await connection.query(q, [values])

        // Release the connection back to the pool
        connection.release()

        res.json("Paciente añadido exitosamente!")
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal Server Error" })
    }
})
