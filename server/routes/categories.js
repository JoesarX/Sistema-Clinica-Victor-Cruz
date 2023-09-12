import express from "express";
const router = express.Router();

const categoriesRouter = (pool) => {
    //get all categories
    router.get("/", async (req, res) => {
        try {
            console.log("hellooo")
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT * FROM categorias ";
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            
            res.json(rows);
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });


    //Add a new category
    router.post("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const q =
                "INSERT INTO `categorias` (`Nombre_Categoria`) VALUES (?)";

            await connection.query(q, req.body[0]);
            connection.release();
            
            res.json("Categoria añadida exitosamente!");
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    //delete Category
    router.delete("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "delete FROM categorias where id = '" + req.params.id + "'";
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            
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
            // 
            const {
                editedValue
            } = req.body;
            const q =
                "UPDATE categorias SET Nombre_Categoria = ? WHERE ID = ?";

            
            // 
            const values = [
                req.body[0],
                req.body[1]

            ];

            /* 
             
             */
            await connection.query(q, values);
            connection.release();
            
            res.json("Categoría actualizado exitosamente!");

        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    return router;
};

export default categoriesRouter;