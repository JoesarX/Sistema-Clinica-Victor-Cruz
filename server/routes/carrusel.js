import express from "express";
const router = express.Router();

const CarruselRouter = (pool) => {
    //get all categories
    router.get("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT * FROM imagenes where tipo = 'Carrusel' ";
            const rows = await connection.query(sqlSelect);
            connection.release();
            res.json(rows[0]);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });


    //Add a new category
    router.post("/", async (req, res) => {
        console.log("IM BEING CALLED")
        const tipo = 'Carrusel';
        const url = req.body.url;
     
        try {
            const connection = await pool.getConnection();

            const q =
                "INSERT INTO imagenes (tipo,url) VALUES (?)";

            const values = [
                tipo,
                url
            ];
            await connection.query(q, [values]);
            connection.release();
            res.json("Imagen añadida exitosamente!");
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    //delete Category
    router.delete("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "delete FROM imagenes where id = '" + req.params.id + "'";
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

export default CarruselRouter;