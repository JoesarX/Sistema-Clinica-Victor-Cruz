import express from "express";

const router = express.Router();

const examenesRouter = (pool) => {

    //Get all examens
    router.get("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            // const sqlSelect = "SELECT * FROM examenes ";
            const sqlSelect = "SELECT * FROM examenes"
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            
            res.json(rows);
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Add a new examen
    router.post("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const q =
                "INSERT INTO `examenes` (`titulo`, `descripcion`, `precio`)  VALUES (?)";
            const values = [
                req.body.titulo,
                req.body.descripcion,
                req.body.precio,
            ];
            await connection.query(q, [values]);
            connection.release();
            
            res.json("Examen añadido exitosamente!");
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Get a examen by id
    router.get("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();

            const sqlSelect = "SELECT * FROM examenes WHERE idexamen = " + req.params.id;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Get One examen ${req.params.id} Successfull`)
            res.json(rows[0])
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Delete a examen by id
    router.delete("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "delete FROM examenes where idexamen = " + req.params.id;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Delete examen ${req.params.id} Successfull`)
            res.json(rows);
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });


    //Update a examen by id
    router.put("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const { id } = req.params;
            const {
                titulo,
                descripcion,
                precio
            } = req.body;
            const q =
                "UPDATE examenes SET titulo = ?, descripcion = ?, precio = ? WHERE idexamen = ?";
            const values = [
                titulo,
                descripcion,
                precio,
                id
            ];

            await connection.query(q, values);
            connection.release();
            console.log(`Update examen ${req.params.id} Successfull`)
            res.json("Examen actualizado exitosamente!");
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    return router;
};

export default examenesRouter;