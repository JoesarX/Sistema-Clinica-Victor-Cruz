import express from "express";

const router = express.Router();

const citasRouter = (pool) => {
    
    //Get all Citas
    router.get("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT * FROM citas"
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            res.json(rows);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Add a new cita
    router.post("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const q =
                "INSERT INTO `citas` (`nombre_persona`, `estado`, `idpaciente`, `correouser`, `hora_inicio`, `hora_final`, `altura`, `peso`, `temperatura`, `ritmo_cardiaco`, `presion`)  VALUES (?)";
            const values = [
                req.body.nombre_persona,
                req.body.estado,
                req.body.idpaciente,
                req.body.correouser,
                req.body.hora_inicio,
                req.body.hora_final,
                req.body.altura,
                req.body.peso,
                req.body.temperatura,
                req.body.ritmo_cardiaco,
                req.body.presion
            ];
            await connection.query(q, [values]);
            connection.release();
            res.json("Cita añadida exitosamente!");
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Get a cita by id
    router.get("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
           
            const sqlSelect = "SELECT * FROM citas WHERE idcita = " + req.params.id;
          
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            res.json(rows[0])
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Delete a cita by id
    router.delete("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "delete FROM citas where idcita = " + req.params.id;
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
                nombre_persona,
                estado,
                idpaciente,
                correouser,
                hora_inicio,
                hora_final,
                altura,
                peso,
                temperatura,
                ritmo_cardiaco,
                presion    
            } = req.body;

            const q =
                "UPDATE citas SET nombre_persona = ?, estado = ?, idpaciente = ?, correouser = ?, hora_inicio = ?, hora_final = ?, altura = ?, peso = ?, temperatura = ?, ritmo_cardiaco = ?, presion = ? WHERE idcita = ?";

            const values = [
                nombre_persona,
                estado,
                idpaciente,
                correouser,
                hora_inicio,
                hora_final,
                altura,
                peso,
                temperatura,
                ritmo_cardiaco,
                presion,
                id
            ];

            await connection.query(q, values);
            connection.release();
            res.json("Cita actualizada exitosamente!");
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    return router;
};

export default citasRouter;
