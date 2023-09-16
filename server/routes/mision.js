import express from "express";
const router = express.Router();

const misionRouter = (pool) => {
    //get all categories
    router.get("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT * FROM textos_cmd where Tipo = 'Mision'";
            const [rows, fields] = await connection.query(sqlSelect);
            console.log("mision here :))")
            console.log(rows)
            connection.release();
            res.json(rows[0]);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });





    router.put("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const { id } = req.params;
            console.log(id);
            const {
                Tipo, texto_campo
            } = req.body;
            const q = "UPDATE textos_cmd SET Tipo = ?, texto_campo = ? WHERE id = 24";
            const values = [
                Tipo,
                texto_campo,
                id
            ];
            console.log(q)
            console.log(values);
            await connection.query(q, values);
            connection.release();
            res.json("Mision actualizada exitosamente!");

        } catch (err) {
            //console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    return router;
};

export default misionRouter;