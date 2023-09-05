import express from "express";

const router = express.Router();

const recetasRouter = (pool) => {

    //============================================== G E T S ==================================================================
    //Get all recetas
    router.get("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT * FROM recetas"
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log("Get all recetas Successfull");
            res.json(rows);
        } catch (err) {
            console.log("Get all recetas Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Get a receta by idcita
    router.get("/cita/:idcita", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT * FROM recetas WHERE idcita = " + req.params.idcita;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Get recetas by idcita ${req.params.id} Successfull`)
            res.json(rows)
        } catch (err) {
            console.log(`Get recetas by idcita ${req.params.id} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Get a receta by id
    router.get("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT * FROM recetas WHERE idreceta = " + req.params.id;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Get One receta ${req.params.id} Successfull`)
            res.json(rows[0])
        } catch (err) {
            console.log(`Get One receta ${req.params.id} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //============================================== P O S T S ==================================================================
    //Add a new receta
    router.post("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const q =
                "INSERT INTO `recetas` (`idcita`, `nombre_medicamento`, `dosis`, `cant_dias`, `frequencia_horas`, `cant_unidades`, `notas_adicionales`)  VALUES (?)";
            const values = [
                req.body.idcita,
                req.body.nombre_medicamento,
                req.body.dosis,
                req.body.cant_dias,
                req.body.frecuencia_horas,
                req.body.cant_unidades,
                req.body.notas_adicionales
            ];
            await connection.query(q, [values]);
            connection.release();
            console.log("Post receta Successfull");
            res.json("Receta añadido exitosamente!");
        } catch (err) {
            console.log("Post receta Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Add a new list of recetas by idcita
    router.post("/cita/:idcita", async (req, res) => {
        try {
            const { recetasLista } = req.body; // Assumiendo que el body es un objeto con una propiedad recetasLista que es un array de recetas
            const idcita = req.params.idcita;

            const connection = await pool.getConnection();
            console.log("Esto es id Cita "+ idcita);
            
            for (const recetaUnica of recetasLista) {
                const { nombre_medicamento, dosis, cant_dias, frecuencia_horas, cant_unidades, notas_adicionales } = recetaUnica;
                const q =
                    "INSERT INTO `recetas` (`idcita`, `nombre_medicamento`, `dosis`, `cant_dias`, `frecuencia_horas`, `cant_unidades`, `notas_adicionales`)  VALUES (?)";
                const values = [
                    idcita,
                    nombre_medicamento,
                    dosis,
                    cant_dias,
                    frecuencia_horas,
                    cant_unidades,
                    notas_adicionales
                ];
                
                await connection.query(q, [values]);
            }

            connection.release();
            console.log(`Create recetas for idcita ${req.params.id} Successful`);
            res.json({ message: "Prescriptions created successfully" });
        } catch (err) {
            console.log(`Create recetas for idcita ${req.params.id} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //============================================== P U T S ==================================================================
    //Update a citas recetas 
    router.put("/cita/:idcita", async (req, res) => {
        try {
            const { recetasLista } = req.body; // Assumiendo que el body es un objeto con una propiedad recetasLista que es un array de recetas

            const connection = await pool.getConnection();

            console.log("In PUT recetas/cita/:idcita. Idcita: ", req.params.idcita)
            console.log("recetasLista: ", recetasLista)

            for (const recetaUnica of recetasLista) {
                const { idreceta, nombre_medicamento, dosis, cant_dias, frequencia_horas, cant_unidades, notas_adicionales } = recetaUnica;

                const q =
                    "UPDATE recetas SET  nombre_medicamento = ?, dosis = ?, cant_dias = ?, frequencia_horas = ?, cant_unidades = ?, notas_adicionales = ? WHERE idreceta = ?";
                const values = [
                    nombre_medicamento,
                    dosis,
                    cant_dias,
                    frequencia_horas,
                    cant_unidades,
                    notas_adicionales,
                    idreceta
                ];

                await connection.query(q, values);
            }
            connection.release();
            console.log(`Update receta ${req.params.idcita} Successfull`)
            res.json("Receta actualizada exitosamente!");
        } catch (err) {
            console.log(`Update receta ${req.params.id} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    
    //Update a receta by id
    router.put("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const { id } = req.params;
            const {
                idcita,
                nombre_medicamento,
                dosis,
                cant_dias,
                frecuencia_horas,
                cant_unidades,
                notas_adicionales
            } = req.body;
            const q =
                "UPDATE recetas SET idcita = ?, nombre_medicamento = ?, dosis = ?, cant_dias = ?, frecuencia_horas = ?, cant_unidades = ?, notas_adicionales = ? WHERE idreceta = ?";
            const values = [
                idcita,
                nombre_medicamento,
                dosis,
                cant_dias,
                frecuencia_horas,
                cant_unidades,
                notas_adicionales,
                id
            ];

            await connection.query(q, values);
            connection.release();
            console.log(`Update receta ${req.params.idcita} Successfull`)
            res.json("Receta actualizada exitosamente!");
        } catch (err) {
            console.log(`Update receta ${req.params.id} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //============================================== D E L E T E S ==================================================================
    //Delete recetas by idcita
    router.delete("/cita/:idcita", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "delete FROM recetas where idcita = " + req.params.idcita;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Delete recetas by idcita ${req.params.id} Successfull`)
            res.json(rows);
        } catch (err) {
            console.log(`Delete recetas by idcita ${req.params.id} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Delete a receta by id
    router.delete("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "delete FROM recetas where idreceta = " + req.params.id;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Delete receta ${req.params.id} Successfull`)
            res.json(rows);
        } catch (err) {
            console.log(`Delete receta ${req.params.id} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    return router;
};



export default recetasRouter;