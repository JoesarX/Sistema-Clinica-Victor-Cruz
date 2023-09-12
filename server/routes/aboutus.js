import express from "express";
const router = express.Router();

const AboutUsRouter = (pool) => {
    //get all categories
    router.get("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT * FROM imagenes WHERE tipo = 'AboutUs1Doc' OR tipo = 'AboutUsDesc';";
            const rows = await connection.query(sqlSelect);
            connection.release();
            res.json(rows[0]);
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //edit img
    router.put("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const { id } = req.params;
            const {
                url,
            } = req.body;
            const q =
                "UPDATE imagenes SET url = ? WHERE idfoto = ?";

            const values = [
                url,
                id
            ];

            await connection.query(q, values);
            connection.release();
            console.log(`Update Imagen ${req.params.id} Successfull`)
            res.json("Imagen actualizado exitosamente!");
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    return router;
};

export default AboutUsRouter;