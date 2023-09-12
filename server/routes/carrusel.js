import express from "express";
const router = express.Router();

const CarruselRouter = (pool) => {
    //get all categories
    router.get("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT * FROM imagenes where tipo = 'Carrusel' order by orden asc";
            const rows = await connection.query(sqlSelect);
            connection.release();
            res.json(rows[0]);
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });


    //Add a new category
    router.post("/", async (req, res) => {
        console.log("IM BEING CALLED")
        const tipo = 'Carrusel';
        const url = req.body.url;
        const visibility = req.body.visibility;
        const orden = req.body.orden;
     
        try {
            const connection = await pool.getConnection();

            const q =
                "INSERT INTO imagenes (tipo,url,visibility,orden) VALUES (?)";

            const values = [
                tipo,
                url,
                visibility,
                orden
            ];
            await connection.query(q, [values]);
            connection.release();
            res.json("Imagen añadida exitosamente!");
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    //delete Category
    router.delete("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "delete FROM imagenes where idfoto = '" + req.params.id + "'and tipo = 'Carrusel'";
            const [rows, fields] = await connection.query(sqlSelect);
            const updateSql = "UPDATE imagenes SET orden = orden - 1 WHERE tipo = 'Carrusel' && orden > ?";
            const updateParams = [req.body.orden];
            const [updateResult] = await connection.query(updateSql, updateParams);
            connection.release();
            res.json({ rows, updateResult });
            
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });


    router.put("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const { id } = req.params;
            const {
                url,
                orden,
                visibility,
            } = req.body;
            
            const q =
                "UPDATE imagenes SET url = ?, orden = ?, visibility = ? WHERE idfoto = ? && tipo = 'Carrusel'";

            const values = [
                url,
                orden,
                visibility,
                id
            ];
            await connection.query(q, values);
            connection.release();
            res.json("Imagen actualizado exitosamente!");
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    return router;
};

export default CarruselRouter;