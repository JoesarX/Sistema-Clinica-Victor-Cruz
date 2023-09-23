import express from "express";

const router = express.Router();

const expedientesAlergiaRouter = (pool, transporter) => {

    //Get all expedientes_alergia by idpaciente
    router.get("/:idpaciente", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = `SELECT id,alergia FROM expedientes_alergia where idpaciente = "${req.params.idpaciente}"`
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log("Get all alergias Successfull");
            res.json(rows);
        } catch (err) {
            console.log("Get all alergias Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    //add expedientes_alergia
    router.post("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const q =
                "INSERT INTO `expedientes_alergia` (`idpaciente`,`alergia`) VALUES (?)";

                const values =[
                    req.body[0],
                    req.body[1]
                ]
                console.log(values);
            await connection.query(q,[values]);
            connection.release();
            console.log("Post expedientes_alergia Successfull");
            res.json("Nuevo expedientes_alergia  añadido exitosamente!");
        } catch (err) {
            console.log("Post expedientes_alergia Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }

    });
    //add list of expedientes_alergia
   
     router.post("/expedientes_alergiaList/:idpaciente", async (req, res) => {
        try {
            const { alergiaLista } = req.body; // Assumiendo que el body es un objeto con una propiedad expedientes_alergia que es un array de alergias
            const idpaciente = req.params.idpaciente;

            const connection = await pool.getConnection();
            console.log("Esto es idpaciente "+ idpaciente);
            console.log(alergiaLista);
            for (const alergiaUnico of alergiaLista) {
                const {idpaciente,alergia} = alergiaUnico;
                const q =
                    "INSERT INTO `expedientes_alergia` (idpaciente`,alergia`)  VALUES (?)";
                const values = [
                    idpaciente,
                    alergia
                    
                ];
               
                await connection.query(q, [values]);
            }

            connection.release();
            console.log(`Create expedientes_alergia for idpaciente ${req.params.idpaciente} Successful`);
            res.json({ message: "expedientes_alergia created successfully" });
        } catch (err) {
            console.log(`Create expedientes_alergia for expedientes_alergia ${req.params.idpaciente} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //update 1 expedientes_alergia
    router.put("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const { id } = req.params;
           
            const q =
                "UPDATE expedientes_alergia SET alergia = ? where id = ?";

            const values =
            //este es el string
                [req.body[1],
                //este es el id
                req.body[0]


                ];
            await connection.query(q, values);
            connection.release();
            console.log(`Put expedientes_alergia ${id} Successfull`)
            res.json("expedientes_alergia actualizado exitosamente!");

        } catch (err) {
            console.log(`Put expedientes_alergia ${id} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    //update all ALERGIA
    router.put("/put_expedientes_alergia_list/:id", async (req, res) => {
        try {
            const { alerLista } = req.body; // Assumiendo que el body es un objeto con una propiedad expedientes_alergia que es un array de alergias     
            const connection = await pool.getConnection();    
            for (const alerUnico of alerLista) {
                const {id,medicamento} = alerUnico;
                const q =
                    "update expedientes_alergia SET alergia = ?  where id = ?";
                const values = [
                    medicamento,
                    id //este es el id que es primary key de la tabla
                    
                ];
                await connection.query(q, values);
            }

            connection.release();
            console.log(`update expedientes_alergia for idpaciente ${req.params.idpaciente} Successful`);
            res.json({ message: "expedientes_alergia updated successfully" });
        } catch (err) {
            console.log(`update expedientes_alergia for expedientes_alergia ${req.params.idpaciente} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //delete all by id paciente
    router.delete("/expedientes_alergia_deleteAll/:idpaciente", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = `delete FROM expedientes_alergia where idpaciente = "${req.params.idpaciente}"`;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Delete expedientes_alergia by idpaciente ${req.params.idpaciente} Successfull`)
            res.json(rows);
        } catch (err) {
            console.log(`Delete expedientes_alergia by idpaciente ${req.params.idpaciente} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    
    //delete  by id 
    router.delete("/expedientes_alergia_delete/:idpaciente", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "delete FROM expedientes_alergia where id = " + req.params.idpaciente;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Delete expedientes_alergia by id ${req.params.idpaciente} Successfull`)
            res.json(rows);
        } catch (err) {
            console.log(`Delete expedientes_alergia by id ${req.params.idpaciente} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    
// //delete varios 
//         router.delete("/expedientes_alergia_deleteList/:id", async (req, res) => {
//             try {
//                 const { alerLista } = req.body; // Assumiendo que el body es un objeto con una propiedad expedientes_alergia que es un array de alergias     
//                 const connection = await pool.getConnection();    
//                 for (const alerUnico of alerLista) {
//                     const {id} = alerUnico;
//                     const q =
//                         "delete from expedientes_alergia where where id = ?";
//                     const values = [
//                         id //este es el id que es primary key de la tabla
                        
//                     ];
//                     await connection.query(q, values);
//                 }
//                 connection.release();
               
//                 res.json({ message: "expedientes_alergia delete successfully" });
//             } catch (err) {
//                 res.status(500).json({ error: "Internal Server Error" });
//             }
//         });
     });
    return router;
};

export default expedientesAlergiaRouter;