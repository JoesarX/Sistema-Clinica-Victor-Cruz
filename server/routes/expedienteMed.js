import express from "express";

const router = express.Router();

const expedientesMedRouter = (pool, transporter) => {

    //Get all meds by idpaciente
    router.get("/:idpaciente", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = `SELECT id,medicamento FROM expediente_med where idpaciente = ${req.params.idpaciente}`
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log("Get all meds Successfull");
            res.json(rows);
        } catch (err) {
            console.log("Get all meds Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    //add meds
    router.post("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const q =
                "INSERT INTO `expediente_med` (`idpaciente`,`medicamento`) VALUES (?)";

                const values =[
                    req.body[0],
                    req.body[1]
                ]
                console.log(values);
            await connection.query(q,[values]);
            connection.release();
            console.log("Post expedientes_med Successfull");
            res.json("Nuevo medicamento  añadido exitosamente!");
        } catch (err) {
            console.log("Post expedientes_med Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }

    });
    //add list of meds
   
     router.post("/expediente_med_list/:idpaciente", async (req, res) => {
        try {
            const { medLista } = req.body; // Assumiendo que el body es un objeto con una propiedad expedientes med que es un array de medicamentos
            const idpaciente = req.params.idpaciente;

            const connection = await pool.getConnection();
            console.log("Esto es idpaciente "+ idpaciente);
            
            for (const medUnico of medLista) {
                const medicamento = medUnico;
                const q =
                    "INSERT INTO `expediente_med` (`idpaciente`,`medicamento`)  VALUES (?)";
                const values = [
                    idpaciente,
                    medicamento
                ];
                
                await connection.query(q, [values]);
            }

            connection.release();
            console.log(`Create medicamentos for idpaciente ${req.params.idpaciente} Successful`);
            res.json({ message: "medicamentos created successfully" });
        } catch (err) {
            console.log(`Create medicamenots for expediente_med ${req.params.idpaciente} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //update 1 medicamento
    router.put("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const { id } = req.params;
           
            const q =
                "UPDATE expediente_med SET medicamento = ? where id = ?";

            const values =
            //este es el string
                [req.body[1],
                //este es el id
                req.body[0]


                ];
            await connection.query(q, values);
            connection.release();
            console.log(`Put expediente_med ${id} Successfull`)
            res.json("medicamento actualizado exitosamente!");

        } catch (err) {
            console.log(`Put id_cmd ${id} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    //update all medicamentos
    router.put("/put_expediente_med_list/:idpaciente", async (req, res) => {
        try {
            const { medLista } = req.body; // Assumiendo que el body es un objeto con una propiedad expedientes med que es un array de medicamentos     
            const connection = await pool.getConnection();    
            const id = re.params.idpaciente
            for (const medUnico of medLista) {
                const medicamento = medUnico;
                const q =
                    "update expediente_med SET medicamento = ?  where id = ?";
                const values = [
                    medicamento,
                    id
                ];
                await connection.query(q, values);
            }

            connection.release();
            console.log(`update medicamentos for idpaciente ${req.params.idpaciente} Successful`);
            res.json({ message: "medicamentos updated successfully" });
        } catch (err) {
            console.log(`update medicamenots for expediente_med ${req.params.idpaciente} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //delete all by id paciente
    router.delete("/med_paciente_deleteAll/:idpaciente", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "delete FROM expediente_med where idpaciente = " + req.params.idpaciente;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Delete medicamento by idpaciente ${req.params.idpaciente} Successfull`)
            res.json(rows);
        } catch (err) {
            console.log(`Delete medicamentos by idpaciente ${req.params.idpaciente} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    
    //delete  by id 
    router.delete("/med_paciente_delete/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "delete FROM expediente_med where id = " + req.params.idpaciente;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Delete medicamento by id ${req.params.id} Successfull`)
            res.json(rows);
        } catch (err) {
            console.log(`Delete medicamentos by id ${req.params.id} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
//delete todos del idpaciente 
        router.delete("/med_paciente_deleteList/:id", async (req, res) => {
            try {     
                const connection = await pool.getConnection();    
                    const {id} = req.params;
                    const q =
                        "delete from expediente_med where where idpaciente = ?";
                    const values = [
                        id //este es el id que es primary key de la tabla  
                    ];
                    await connection.query(q, values);
                
                connection.release();
               
                res.json({ message: "medicamentos delete successfully" });
            } catch (err) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    });
    return router;
};

export default expedientesMedRouter;