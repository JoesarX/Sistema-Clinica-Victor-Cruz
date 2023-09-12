import express from "express";

const router = express.Router();

const expedientesRouter = (pool) => {

    //Get all patients
    router.get("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            // const sqlSelect = "SELECT * FROM expedientes ";
            const sqlSelect = "SELECT idpaciente, nombre, TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE()) AS edad, DATE_FORMAT(fecha_nacimiento, '%Y-%m-%d') AS fecha_nacimiento, sexo, correo, telefono, numid, estado_civil, padecimientos, ocupacion FROM expedientes"
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            res.json(rows);
            
        } catch (err) {
            console.log("Get all Expedientes call failed. Error: " + err)
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    router.get("/UserExpedients/:correo", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const email = req.params.correo;
            const sqlSelect = "select E.* from Expedientes E left join Usuarios U on E.correo = U.correouser where E.correo = ?"
            const [rows, fields] = await connection.query(sqlSelect, email);
            connection.release();
            res.json(rows);
            
        } catch (err) {
            console.log("Get all Expedientes call failed. Error: " + err)
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    router.get("/userpage/:correo", async (req, res) => {
        try {
            const correo = req.params.correo;
            const connection = await pool.getConnection();
            const q = `
            SELECT idpaciente, nombre, edad
            FROM expedientes 
            WHERE correo = ?
          `;
            const [rows] = await connection.query(q, [correo]);
            const data = rows.map(row => {
                return {
                    idPaciente: row.idpaciente,
                    nombre: row.nombre,
                    edad: row.edad
                }
            })
            connection.release();
            res.json(data);
        } catch (error) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Add a new patient
    router.post("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const q =
                "INSERT INTO `expedientes` (`nombre`, `edad`, `fecha_nacimiento`, `sexo`, `correo`, `telefono`, `numid`, `estado_civil`, `padecimientos`, `ocupacion`) VALUES (?)";
            const values = [
                req.body.nombre,
                req.body.edad,
                req.body.fecha_nacimiento,
                req.body.sexo,
                req.body.correo,
                req.body.telefono,
                req.body.numid,
                req.body.estado_civil,
                req.body.padecimientos,
                req.body.ocupacion
            ];
            await connection.query(q, [values]);
            connection.release();
            
            res.json("Expediente añadido exitosamente!");
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Get a patient by id
    router.get("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();

            const sqlSelect = "SELECT * FROM expedientes WHERE idpaciente = " + req.params.id;

            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            res.json(rows[0])
            
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Get a patient by id for details
    router.get("/dashboard/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();

            const sqlSelect = "SELECT idpaciente, nombre, TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE()) AS edad, DATE_FORMAT(fecha_nacimiento, '%Y-%m-%d') AS fecha_nacimiento, sexo, correo, telefono, numid, estado_civil, padecimientos, ocupacion, altura, peso, temperatura, ritmo_cardiaco, presion FROM expedientes  WHERE idpaciente = " + req.params.id;

            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            res.json(rows[0])
            
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    router.get("/dashboard/cita/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();

            const sqlSelect = "SELECT * from citas as c WHERE idpaciente = " + req.params.id + " ORDER BY c.fecha, c.hora";

            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            res.json(rows)
            
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //pUT a patient by id for Dashboard
    router.put("/dashboard/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const { id } = req.params;
            
            const {
                altura,
                peso,
                temperatura,
                ritmo_cardiaco,
                presion
            } = req.body;

            const q = "UPDATE expedientes SET altura = ?, peso = ?, temperatura = ?, ritmo_cardiaco = ?, presion = ? WHERE idpaciente = ?";

            const values = [
                altura,
                peso,
                temperatura,
                ritmo_cardiaco,
                presion,
                id
            ];
            await connection.query(q, values);
            connection.release();
            
            res.json("Expediente actualizado exitosamente!");
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Delete a patient by id
    router.delete("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "delete FROM expedientes where idpaciente = " + req.params.id;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            res.json(rows);
            
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Update a patient by id
    router.put("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const { id } = req.params;
            const {
                nombre,
                edad,
                fecha_nacimiento,
                sexo,
                correo,
                telefono,
                numid,
                estado_civil,
                padecimientos,
                ocupacion,
            } = req.body;

            const q =
                "UPDATE expedientes SET nombre = ?, edad = ?, fecha_nacimiento = ?, sexo = ?, correo = ?,  telefono = ?, numid = ?, estado_civil = ?, padecimientos = ?, ocupacion = ? WHERE idpaciente = ?";

            const values = [
                nombre,
                edad,
                fecha_nacimiento,
                sexo,
                correo,
                telefono,
                numid,
                estado_civil,
                padecimientos,
                ocupacion,
                id
            ];
            await connection.query(q, values);
            connection.release();
            
            res.json("Expediente actualizado exitosamente!");
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    return router;
};

export default expedientesRouter;
