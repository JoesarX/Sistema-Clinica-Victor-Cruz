import express from "express";
const router = express.Router();

const preciosRouter = (pool) => {
    //get all precios
    router.get("/", async (req, res) => {
        try {
            console.log("hellooo")
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT * FROM Precios ";
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            
            res.json(rows);
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });


    //Add a new Precio
    router.post("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const q =
                "INSERT INTO `Precios` (`nombre_servicio` , `precio`) VALUES (?)";
               var value =[req.body.nombre_servicio,req.body.precio];

                
                
                

            await connection.query(q, [value]);
            connection.release();
            
            res.json("Servicio añadido exitosamente!");
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    //delete Servicio
    router.delete("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "delete FROM Precios where id = " + req.params.id;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            
            res.json(rows);
        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //edit Servicio 
    router.put("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            //const { id } = req.params;
            // 
           
            const q =
                "UPDATE precios SET nombre_servicio = ? , precio = ?  WHERE id = ?";

            
            // 
            const values = [
                
                req.body.nombre_servicio,
                req.body.precio,
                req.body.id

            ];
            console.log(values)
            /* 
             
             */
            await connection.query(q, values);
            connection.release();
            
            res.json("Servicio actualizado exitosamente!");

        } catch (err) {
            
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    return router;
};

export default preciosRouter;