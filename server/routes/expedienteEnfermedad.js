import express from "express";

const router = express.Router();

const expedientesEnfermedadesRouter = (pool, transporter) => {

    //Get all expedientes_alergia by idpaciente
    router.get("/expedientes_enfermadad/:idpaciente", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = `SELECT id,enfermedad FROM expedientes_alergia idpaciente = "${req.params.idCita}"`
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log("Get all meds Successfull");
            res.json(rows);
        } catch (err) {
            console.log("Get all meds Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    //add expedientes_alergia
    router.post("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const q =
                "INSERT INTO `expedientes_enfermadad` (`idpaciente,enfermedad`) VALUES (?)";

                const values =[
                    req.body[0],
                    req.body[1]
                ]
            await connection.query(q,[values]);
            connection.release();
            console.log("Post expedientes_enfermadad Successfull");
            res.json("Nuevo expedientes_enfermadad  añadido exitosamente!");
        } catch (err) {
            console.log("Post expedientes_enfermadad Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }

    });
    //add list of expedientes_alergia
   
     router.post("/expedientes_enfermadad/:idpaciente", async (req, res) => {
        try {
            const { medLista } = req.body; // Assumiendo que el body es un objeto con una propiedad expedientes_alergia que es un array de alergias
            const idpaciente = req.params.idpaciente;

            const connection = await pool.getConnection();
            console.log("Esto es idpaciente "+ idpaciente);
            
            for (const medUnico of medLista) {
                const {idpaciente,medicamento} = medUnico;
                const q =
                    "INSERT INTO `expedientes_enfermadad` (idpaciente,enfermedad`)  VALUES (?)";
                const values = [
                    idpaciente,
                    alergia
                    
                ];
                
                await connection.query(q, [values]);
            }

            connection.release();
            console.log(`Create expedientes_enfermadad for idpaciente ${req.params.idpaciente} Successful`);
            res.json({ message: "expedientes_enfermadad created successfully" });
        } catch (err) {
            console.log(`Create expedientes_enfermadad for expedientes_enfermadad ${req.params.idpaciente} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //update 1 expedientes_alergia
    router.put("/:idpaciente", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const { id } = req.params;
           
            const q =
                "UPDATE expedientes_enfermadad SET enfermedad = ? where id = ?";

            const values =
            //este es el string
                [req.body[1],
                //este es el id
                req.body[0]


                ];
            await connection.query(q, values);
            connection.release();
            console.log(`Put expedientes_enfermadad ${id} Successfull`)
            res.json("expedientes_enfermadad actualizado exitosamente!");

        } catch (err) {
            console.log(`Put expedientes_enfermadad ${id} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    //update all medicamentos
    router.put("/expedientes_enfermadad_list/:idpaciente", async (req, res) => {
        try {
            const { enfLista } = req.body; // Assumiendo que el body es un objeto con una propiedad expedientes_enfermadad que es un array de enfermedad     
            const connection = await pool.getConnection();    
            for (const enfUnico of enfLista) {
                const {id,enfermedad} = enfUnico;
                const q =
                    "update expedientes_enfermadad SET enfermedad = ?  where id = ?";
                const values = [
                    enfermedad,
                    id //este es el id que es primary key de la tabla
                    
                ];
                await connection.query(q, values);
            }

            connection.release();
            console.log(`update expedientes_enfermadad for idpaciente ${req.params.idpaciente} Successful`);
            res.json({ message: "expedientes_enfermadad updated successfully" });
        } catch (err) {
            console.log(`update expedientes_enfermadad for expedientes_enfermadad ${req.params.idpaciente} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //delete all by id paciente
    router.delete("/expedientes_enfermadad_deleteAll/:idpaciente", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "delete FROM expedientes_enfermadad where idpaciente = " + req.params.idpaciente;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Delete expedientes_enfermadad by idpaciente ${req.params.idpaciente} Successfull`)
            res.json(rows);
        } catch (err) {
            console.log(`Delete expedientes_enfermadad by idpaciente ${req.params.idpaciente} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    
    //delete  by id 
    router.delete("/expedientes_enfermadad_delete/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "delete FROM expedientes_enfermadad where id = " + req.params.idpaciente;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Delete expedientes_enfermadad by id ${req.params.id} Successfull`)
            res.json(rows);
        } catch (err) {
            console.log(`Delete expedientes_enfermadad by id ${req.params.id} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
//delete varios 
        router.delete("/expedientes_enfermadad_deleteList/:id", async (req, res) => {
            try {
                const { alerLista } = req.body; // Assumiendo que el body es un objeto con una propiedad expedientes_alergia que es un array de alergias     
                const connection = await pool.getConnection();    
                for (const alerUnico of alerLista) {
                    const {id} = alerUnico;
                    const q =
                        "delete from expedientes_enfermadad where where id = ?";
                    const values = [
                        id //este es el id que es primary key de la tabla
                        
                    ];
                    await connection.query(q, values);
                }
                connection.release();
               
                res.json({ message: "expedientes_enfermadad delete successfully" });
            } catch (err) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    });
    return router;
};

export default expedientesEnfermedadesRouter;