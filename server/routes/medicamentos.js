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

    //Add a new medicamento
    router.post("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const q =
                "INSERT INTO `medicamentos` (`nombre`, `categoria`, `stock`, `precio_unitario`, `via`, `dosis`, `urlfoto`)  VALUES (?)";
            const values = [
                req.body.nombre,
                req.body.categoria,
                req.body.stock,
                req.body.precio_unitario,
                req.body.via,
                req.body.dosis,
                req.body.urlfoto
            ];
            await connection.query(q, [values]);
            connection.release();
            res.json("Medicamento añadido exitosamente!");
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Get a medicamento by id
    router.get("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
           
            const sqlSelect = "SELECT * FROM medicamentos WHERE idmed = " + req.params.id;
          
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
            const sqlSelect = "delete FROM medicamentos where idmed = " + req.params.id;
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
                categoria,
                stock,
                precio_unitario,
                via,
                dosis,
                urlfoto,
            } = req.body;

            const q =
                "UPDATE medicamentos SET nombre = ?, categoria = ?, stock = ?, precio_unitario = ?, via = ?, dosis = ?, urlfoto = ? WHERE idmed = ?";

            const values = [
                nombre,
                categoria,
                stock,
                precio_unitario,
                via,
                dosis,
                urlfoto,
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
