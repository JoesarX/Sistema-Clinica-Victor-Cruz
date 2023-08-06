import express from "express";
const router = express.Router();

const textos_cmdRouter = (pool) => {
    //get all text
    router.get("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT * FROM textos_cmd";
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log("Get all textos_cmd Successfull");
            res.json(rows);
        } catch (err) {
            console.log("Get all textos_cmd Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //get one text
    router.get("/textos/:object", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT texto_campo FROM textos_cmd WHERE Tipo = '"+req.params.object+"'";
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Get textos_cmd ${req.params.object} Successfull`)
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
            console.log("Body: "+req.body[0]+" "+req.body[1]);
            console.log("Sin Body: "+req);
            const q =
                "INSERT INTO `textos_cmd` (`Tipo`,`texto_campo`) VALUES (?)";
                const values = 
                [   req.body[0],
                    req.body[1]
                    
                    
                ];
                console.log("Estos son los values: "+values[0]+" "+values[1]);
            await connection.query(q,[values]);
            connection.release();
            res.json("Nuevo campo  añadido exitosamente!");
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error"});
        }
    });
    //delete text
    router.delete("/:id", async (req, res) => {
        try {
            console.log("Este es el Tipo: "+req.params.id);
            const connection = await pool.getConnection();
            const sqlSelect = "delete FROM textos_cmd where Tipo = '" + req.params.id + "'";
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            res.json(rows);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //edit text 
    router.put("/:objectTipo", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const {id}  = req.params;
           // console.log(id);
           const {
            editedValue
           }=req.body;
            const q =
                "UPDATE textos_cmd SET texto_campo = ? WHERE Tipo = ?";
          
            console.log("ReqBody papu;: "+req.body[1] + " " + req.body[0]+  " "+req.body.texto_campo);
           // console.log(req);
            const values = [
                req.body.texto_campo,
                req.params.objectTipo
                
                
            ];
            
           /* console.log(values);
            console.log(values[0]);
            console.log(values[1]);*/
            //console.log("Esto es params: "+req.params);
            console.log("Esto es values!!!! : "+values);
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

export default textos_cmdRouter;