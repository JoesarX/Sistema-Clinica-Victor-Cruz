import express from "express";

const router = express.Router();

const medicamentosRouter = (pool) => {

    //Get all patients
    router.get("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            // const sqlSelect = "SELECT * FROM medicamentos ";
            const sqlSelect = "SELECT m.idmed, m.nombre, m.stock, m.precio_unitario, m.via,m.dosis,m.urlfoto,c.Nombre_Categoria FROM medicamentos m left join categorias c ON m.id_categoria = c.id"
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log("Get all medicamentos Successfull");
            res.json(rows);
        } catch (err) {
            console.log("Get all medicamentos Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Add a new medicamento
    router.post("/", async (req, res) => {
        console.log(":)")
        console.log(":()()")
        try {
            const connection = await pool.getConnection();
            const q =
                "INSERT INTO `medicamentos` (`nombre`, `stock`, `precio_unitario`, `via`, `dosis`, `urlfoto`,`id_categoria`)  VALUES (?)";
            const values = [
                req.body.nombre,
                req.body.stock,
                req.body.precio_unitario,
                req.body.via,
                req.body.dosis,
                req.body.urlfoto,
                req.body.id_categoria
            ];
            await connection.query(q, [values]);
            connection.release();
            console.log("Post medicamento Successfull");
            res.json("Medicamento añadido exitosamente!");
        } catch (err) {
            console.log("Post medicamento Failed. Error: " + err);
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
            console.log(`Get One medicamento ${req.params.id} Successfull`)
            res.json(rows[0])
        } catch (err) {
            console.log(`Get One medicamento ${req.params.id} Failed. Error: ` + err);
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
            console.log(`Delete medicamento ${req.params.id} Successfull`)
            res.json(rows);
        } catch (err) {
            console.log(`Delete medicamento ${req.params.id} Failed. Error: ` + err);
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
                stock,
                precio_unitario,
                via,
                dosis,
                urlfoto,
                id_categoria,
            } = req.body;
            const q =
                "UPDATE medicamentos SET nombre = ?, stock = ?, precio_unitario = ?, via = ?, dosis = ?, urlfoto = ?, id_categoria=? WHERE idmed = ?";

            const values = [
                nombre,
                stock,
                precio_unitario,
                via,
                dosis,
                urlfoto,
                id_categoria,
                id
            ];

            await connection.query(q, values);
            connection.release();
            console.log(`Update medicamento ${req.params.id} Successfull`)
            res.json("Medicamento actualizado exitosamente!");
        } catch (err) {
            console.log(`Update medicamento ${req.params.id} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    return router;
};

export default medicamentosRouter;