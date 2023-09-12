import express from "express";
const router = express.Router();

const id_cmdRouter = (pool) => {
    //get all text
    router.get("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT * FROM id_cmd ";
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            
            res.json(rows);
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });


    //Add a new text
    router.post("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const q =
                "INSERT INTO `id_cmd` (`nombre_id`) VALUES (?)";

            await connection.query(q, req.body[0]);
            connection.release();
            
            res.json("Nuevo campo  añadido exitosamente!");
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    //delete id_cmd
    router.delete("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "delete FROM id_cmd where nombre_id = '" + req.params.id + "'";
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Delete id_cmd ${req.params.id} Successfull`)
            res.json(rows);
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //edit category 
    router.put("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const { id } = req.params;
            const {
                editedValue
            } = req.body;
            const q =
                "UPDATE id_cmd SET nombre_id = ? where nombre_id = ?";

            const values =
                [req.body[1],
                req.body[0]


                ];
            await connection.query(q, values);
            connection.release();
            console.log(`Put id_cmd ${id} Successfull`)
            res.json("Categoría actualizado exitosamente!");

        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    return router;
};

export default id_cmdRouter;