import express from "express";

const router = express.Router();

const serviciosRouter = (pool) => {

    //Get all services
    router.get("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT id, url, title, description, orden, visibility FROM servicios order by orden asc"
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            res.json(rows);
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Add a new service
    router.post("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const q =
                "INSERT INTO `servicios` (`url`, `title`, `description`, `orden`, `visibility`)  VALUES (?)";
            const values = [
                req.body.url,
                req.body.title,
                req.body.description,
                req.body.orden,
                req.body.visibility
            ];
            await connection.query(q, [values]);
            connection.release();
            res.json("Servicio añadido exitosamente!");
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Get a service by id
    router.get("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();

            const sqlSelect = "SELECT * FROM servicios WHERE id = " + req.params.id;

            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            res.json(rows[0])
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Delete a service by id
    router.delete("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "delete FROM servicios where id = " + req.params.id;
            const [rows, fields] = await connection.query(sqlSelect);
            const updateSql = "UPDATE servicios SET orden = orden - 1 WHERE orden > ?";
            const updateParams = [req.body.orden];
            const [updateResult] = await connection.query(updateSql, updateParams);
            connection.release();
            //res.json(rows);
            res.json({ rows, updateResult });
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });


    //Update a service by id
    router.put("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const { id } = req.params;
            const {
                url,
                title,
                description,
                orden,
                visibility,
            } = req.body;
            const q =
                "UPDATE servicios SET url = ?, title = ?, description = ?, orden = ?, visibility = ? WHERE id = ?";

            const values = [
                url,
                title,
                description,
                orden,
                visibility,
                id
            ];

            await connection.query(q, values);
            connection.release();
            res.json("Servicio actualizado exitosamente!");
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    return router;
};

export default serviciosRouter;