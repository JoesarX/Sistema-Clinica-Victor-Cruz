import express from "express";

const router = express.Router();

const pagosRouter = (pool) => {

    //============================================== G E T S ==================================================================
    //Get all pagos
    router.get("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT * FROM pagos"
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log("Get all pagos Successfull");
            res.json(rows);
        } catch (err) {
            console.log("Get all pagos Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Get a pago by correouser
    router.get("/usuario/:correouser", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = `SELECT * FROM pagos WHERE correouser = "${req.params.correouser}"`;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Get pagos by correouser ${req.params.id} Successfull`)
            res.json(rows)
        } catch (err) {
            console.log(`Get pagos by correouser ${req.params.id} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Get a pago by id
    router.get("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = `SELECT * FROM pagos WHERE idpago = "${req.params.id}"`;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Get One pago ${req.params.id} Successfull`)
            res.json(rows[0])
        } catch (err) {
            console.log(`Get One pago ${req.params.id} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //============================================== P O S T S ==================================================================
    //Add a new pago
    router.post("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            
            await connection.query("SET time_zone = 'America/Guatemala'");
            const q =
                "INSERT INTO `pagos` (`idpago`, `idpayer`, `idcita`, `nombre`, `apellido`, `correouser`, `correopago`, `country_code`, `monto_pagado`)  VALUES (?)";
            console.log("Post pago values:")
            console.log(req.body)
            const values = [
                req.body.idpago,
                req.body.idpayer,
                req.body.idcita,
                req.body.nombre,
                req.body.apellido,
                req.body.correouser,
                req.body.correopago,
                req.body.country_code,
                req.body.monto_pagado
            ];
            await connection.query(q, [values]);
            connection.release();
            console.log("Post pago Successfull");
            res.json("Pago añadido exitosamente!");
        } catch (err) {
            console.log("Post pago Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });


    //============================================== P U T S ==================================================================
    //Update a pago by id
    router.put("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const { id } = req.params;
            const {
                idpayer,
                idcita,
                nombre,
                apellido,
                correouser,
                correopago,
                country_code,
                monto_pagado
            } = req.body;

            const q =
                "UPDATE pagos SET idpayer = ?, idcita = ?, nombre = ?, apellido = ?, correouser = ?, correopago = ?, country_code = ?, monto_pagado = ? WHERE idpago = ?";
            const values = [
                idpayer,
                idcita,
                nombre,
                apellido,
                correouser,
                correopago,
                country_code,
                monto_pagado,
                id
            ];

            await connection.query(q, values);
            connection.release();
            console.log(`Update pago ${req.params.idpago} Successfull`)
            res.json("Pago actualizada exitosamente!");
        } catch (err) {
            console.log(`Update pago ${req.params.idpago} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });


    //============================================== D E L E T E S ==================================================================
    //Delete a pago by id
    router.delete("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = `delete FROM pagos where idpago = + "${req.params.id}"`;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Delete pago ${req.params.id} Successfull`)
            res.json(rows);
        } catch (err) {
            console.log(`Delete pago ${req.params.id} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    return router;
};



export default pagosRouter;