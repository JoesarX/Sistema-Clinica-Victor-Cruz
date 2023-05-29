import express from "express";

const router = express.Router();

const expedientesRouter = (pool) => {
    
    //Get all patients
    router.get("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            // const sqlSelect = "SELECT * FROM expedientes ";
            const sqlSelect = "SELECT idpaciente, nombre, TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE()) AS edad, fecha_nacimiento, sexo, correo, telefono, numid, estado_civil, padecimientos, ocupacion FROM expedientes"
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            res.json(rows);
        } catch (err) {
            console.log(err);
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
            console.log(err);
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
            console.log(err);
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
            console.log(err);
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
                ocupacion
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
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    return router;
};

export default expedientesRouter;
