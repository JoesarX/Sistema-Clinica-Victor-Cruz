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
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });


    //Add a new text
    router.post("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            console.log("req cmdValue: "+req.body.cmdValue);
            console.log("Body: "+req.body[0]);
            console.log("Sin Body: "+req);
            const q =
                "INSERT INTO `id_cmd` (`nombre_id`) VALUES (?)";
           
            await connection.query(q,req.body[0]);
            connection.release();
            res.json("Nuevo campo  añadido exitosamente!");
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error"});
        }
    });
    //delete id_cmd
    router.delete("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "delete FROM id_cmd where nombre_id = '" + req.params.id + "'";
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
                "UPDATE id_cmd SET nombre_id = ? where nombre_id = ?";
          
            console.log(req.body[1] + " " + req.body[0]);
           // console.log(req);
            const values = 
            [   req.body[1],
                req.body[0]
                
                
            ];
            
           /* console.log(values);
            console.log(values[0]);
            console.log(values[1]);*/
            console.log("Esto es params: "+req.params[0]);
            console.log("Esto es values: "+values[0]);
            console.log("Esto es values: "+values[1]);
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

export default id_cmdRouter;