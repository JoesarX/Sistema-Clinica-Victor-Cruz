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
            console.log("Get all categories Successfull");
            res.json(rows);
        } catch (err) {
            console.log("Get all categories Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });


    //Add a new category
    router.post("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const q =
                "INSERT INTO `categorias` (`Nombre_Categoria`) VALUES (?)";
           
            await connection.query(q,req.body[0]);
            connection.release();
            console.log("Post category Successfull");
            res.json("Categoria añadida exitosamente!");
        } catch (err) {
            console.log("Post category Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error"});
        }
    });
    //delete Category
    router.delete("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "delete FROM categorias where id = '" + req.params.id + "'";
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log("Delete category "+ req.params.id+ " Successfull");
            res.json(rows);
        } catch (err) {
            console.log("Delete category "+ req.params.id+ " Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //edit category 
    router.put("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const {id}  = req.params;
           // console.log(id);
           const {
            editedValue
           }=req.body;
            const q =
                "UPDATE categorias SET Nombre_Categoria = ? WHERE ID = ?";
          
            console.log(req.body[1] + " " + req.body[0]);
           // console.log(req);
            const values = [
                req.body[0],
                req.body[1]
                
            ];
            
           /* console.log(values);
            console.log(values[0]);
            console.log(values[1]);*/
           await connection.query(q, values);
            connection.release();
            console.log(`Put category ${id} Successfull`);
            res.json("Categoría actualizado exitosamente!");
          
        } catch (err) {
            console.log(`Put category ${id} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    return router;
};

export default categoriesRouter;