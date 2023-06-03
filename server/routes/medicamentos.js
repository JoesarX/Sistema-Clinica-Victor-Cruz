import express from "express";

const router = express.Router();

const medicamentosRouter = (pool) => {
    
    //Get all patients
    router.get("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            // const sqlSelect = "SELECT * FROM medicamentos ";
            const sqlSelect = "SELECT * FROM medicamentos"
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
                "INSERT INTO `medicamentos` (`nombre`, `id_categoria`, `stock`, `precio_unitario`, `via`, `dosis`)  VALUES (?)";
            const values = [
                req.body.nombre,
                req.body.id_categoria,
                req.body.stock,
                req.body.precio_unitario,
                req.body.via,
                req.body.dosis
            ];
            await connection.query(q, [values]);
            connection.release();
            res.json("Medicamento añadido exitosamente!");
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Get a patient by id
    router.get("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
           
            const sqlSelect = "SELECT * FROM medicamentos WHERE idpaciente = " + req.params.id;
          
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
            const sqlSelect = "delete FROM medicamentos where idpaciente = " + req.params.id;
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
                "UPDATE medicamentos SET nombre = ?, edad = ?, fecha_nacimiento = ?, sexo = ?, correo = ?,  telefono = ?, numid = ?, estado_civil = ?, padecimientos = ?, ocupacion = ? WHERE idpaciente = ?";

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
            res.json("Medicamento actualizado exitosamente!");
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    return router;
};

export default medicamentosRouter;
