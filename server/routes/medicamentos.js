import express from "express";

const router = express.Router();

const medicamentosRouter = (pool) => {

    //Get all patients
    router.get("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            // const sqlSelect = "SELECT * FROM medicamentos ";
            const sqlSelect = "SELECT m.idmed, m.nombre, m.stock, m.precio_unitario, m.via,m.dosis,m.urlfoto,c.Nombre_Categoria FROM medicamentos m inner join categorias c where m.id_categoria=c.id"
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
                "INSERT INTO `imagenes` (`tipo`, `url`)  VALUES (?)";
            const values = [
                tipo = 'Carrusel',
                url = req.body.url
            ];
            console.log("Este es el url: " + req.body.url);
            await connection.query(q, [values]);
            connection.release();
            res.json("Imagen añadida exitosamente!");
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Delete a patient by id
    router.delete("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "delete FROM imagenes where idfoto = " + req.params.id;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            res.json(rows);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    return router;
};

export default medicamentosRouter;
