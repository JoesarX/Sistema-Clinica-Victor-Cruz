import express from "express";

const router = express.Router();

const facturasRouter = (pool) => {

    //============================================== G E T S ==================================================================
    //Get all facturas
    router.get("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT * FROM facturas ORDER BY idCita DESC"
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log("Get all facturas Successfull");
            res.json(rows);
        } catch (err) {
            console.log("Get all facturas Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Get a factura by idCita
    router.get("/cita/:idCita", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = `SELECT * FROM facturas WHERE idCita = "${req.params.idCita}"`;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Get facturas by idCita ${req.params.id} Successfull`)
            res.json(rows)
        } catch (err) {
            console.log(`Get facturas by idCita ${req.params.id} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Get a factura by id
    router.get("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = `SELECT * FROM facturas WHERE idfactura = "${req.params.id}"`;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Get One factura ${req.params.id} Successfull`)
            res.json(rows[0])
        } catch (err) {
            console.log(`Get One factura ${req.params.id} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //============================================== P O S T S ==================================================================
    //Add a new factura
    router.post("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            
            await connection.query("SET time_zone = 'America/Guatemala'");
            const q =
                "INSERT INTO `facturas` (`nombre_paciente`, `idCita`, `isPagada`, `total`, `metodoPago`, `rtn`, `correo`)  VALUES (?)";
            console.log("Post factura values:")
            console.log(req.body)
            const values = [
                req.body.nombre_paciente,
                req.body.idCita,
                req.body.isPagada,
                req.body.total,
                req.body.metodoPago,
                req.body.rtn,
                req.body.correo
            ];
            await connection.query(q, [values]);
            connection.release();
            console.log("Post factura Successfull");
            res.json("Factura añadida exitosamente!");
        } catch (err) {
            console.log("Post factura Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });


    //============================================== P U T S ==================================================================
    //Update a factura by idCita
    router.put("/cita/:idCita", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const { idCita } = req.params;
            const {
                nombre_paciente,
                isPagada,
                total,
                metodoPago,
                rtn,
                correo
            } = req.body;

            const q =
                "UPDATE facturas SET nombre_paciente = ? , isPagada = ? , total = ? , metodoPago = ? , rtn = ? , correo = ? WHERE idCita = ?";
            const values = [
                nombre_paciente,
                isPagada,
                total,
                metodoPago,
                rtn,
                correo,
                idCita
            ];

            await connection.query(q, values);
            connection.release();
            console.log(`Update factura by idCita ${req.params.idfactura} Successfull`)
            res.json("Factura actualizada exitosamente!");
        } catch (err) {
            console.log(`Update factura by idCita ${req.params.idfactura} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Update a factura by id
    router.put("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const { id } = req.params;
            const {
                nombre_paciente,
                idCita,
                isPagada,
                total,
                metodoPago,
                rtn,
                correo
            } = req.body;

            const q =
                "UPDATE facturas SET nombre_paciente = ? , idCita = ? , isPagada = ? , total = ? , metodoPago = ? , rtn = ? , correo = ? WHERE idfactura = ?";
            const values = [
                nombre_paciente,
                idCita,
                isPagada,
                total,
                metodoPago,
                rtn,
                correo,
                id
            ];

            await connection.query(q, values);
            connection.release();
            console.log(`Update factura ${req.params.idfactura} Successfull`)
            res.json("Factura actualizada exitosamente!");
        } catch (err) {
            console.log(`Update factura ${req.params.idfactura} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });


    //============================================== D E L E T E S ==================================================================
    //Delete a factura by idCita
    router.delete("/cita/:idCita", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = `delete FROM facturas where idCita = + "${req.params.idCita}"`;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Delete factura ${req.params.idCita} Successfull`)
            res.json(rows);
        } catch (err) {
            console.log(`Delete factura ${req.params.idCita} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });


    //Delete a factura by id
    router.delete("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = `delete FROM facturas where idFactura = + "${req.params.id}"`;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Delete factura ${req.params.id} Successfull`)
            res.json(rows);
        } catch (err) {
            console.log(`Delete factura ${req.params.id} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    return router;
};



export default facturasRouter;