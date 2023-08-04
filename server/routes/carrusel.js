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
        try {
            const connection = await pool.getConnection();
            console.log("req categoriaINput: "+req.body.categoriaValue);
            console.log("Body: "+req.body[0]);
            console.log("Sin Body: "+req);
            const q =
                "INSERT INTO `categorias` (`Nombre_Categoria`) VALUES (?)";
           
            await connection.query(q,req.body[0]);
            connection.release();
            res.json("Categoria añadida exitosamente!");
        } catch (err) {
            console.log(err);
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
            res.json(rows);
        } catch (err) {
            console.log(err);
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
            console.log("Esto es params: "+req.params);
            console.log("Esto es values: "+values);
           await connection.query(q, values);
            connection.release();
            res.json("Categoría actualizado exitosamente!");
          
        } catch (err) {
            //console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    return router;
};

export default CarruselRouter;