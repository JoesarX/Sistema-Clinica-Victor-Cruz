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
            console.log("Get all Precios Successfull");
            res.json(rows);
        } catch (err) {
            console.log("Get all categories Failed. Error: " + err);
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

                console.log(req.body.nombre_servicio);
                console.log(req.body.precio);
                console.log(value);

            await connection.query(q, [value]);
            connection.release();
            console.log("Post Servicio Successfull");
            res.json("Servicio añadido exitosamente!");
        } catch (err) {
            console.log("Post precio Failed. Error: " + err);
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
            console.log("Delete Servicio " + req.params.id + " Successfull");
            res.json(rows);
        } catch (err) {
            console.log("Delete Servicio " + req.params.id + " Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //edit Servicio 
    router.put("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            //const { id } = req.params;
            // console.log(id);
           
            const q =
                "UPDATE precios SET nombre_servicio = ? , precio = ?  WHERE id = ?";

            console.log(req.body[1] + " " + req.body[0]);
            // console.log(req);
            const values = [
                
                req.body.nombre_servicio,
                req.body.precio,
                req.body.id

            ];
            console.log(values)
            /* console.log(values);
             console.log(values[0]);
             console.log(values[1]);*/
            await connection.query(q, values);
            connection.release();
            console.log(`Put Servicio ${req.body.id} Successfull`);
            res.json("Servicio actualizado exitosamente!");

        } catch (err) {
            console.log(`Put Servicio ${req.body.id} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    return router;
};

export default preciosRouter;