import express from "express";

const router = express.Router();

const citasRouter = (pool) => {

    //Get all Citas
    router.get("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT idcita, nombre_persona, estado, idpaciente, correouser, DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha, DATE_FORMAT(hora, '%l:%i %p') AS hora, altura, peso, temperatura, ritmo_cardiaco, presion FROM citas";
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            res.json(rows);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Add a new cita
    router.post("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const q =
                "INSERT INTO `citas` (`nombre_persona`, `estado`, `idpaciente`, `correouser`, `fecha`,`hora`,`altura`, `peso`, `temperatura`, `ritmo_cardiaco`, `presion`)  VALUES (?)";
            const values = [
                req.body.nombre_persona,
                req.body.estado,
                req.body.idpaciente,
                req.body.correouser,
                req.body.fecha,
                req.body.hora,
                req.body.altura,
                req.body.peso,
                req.body.temperatura,
                req.body.ritmo_cardiaco,
                req.body.presion
            ];
            console.log(values);
            await connection.query(q, [values]);
            connection.release();
            res.json("Cita añadida exitosamente!");
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    router.get('/checkAvailability', async (req, res) => {
        try {
            const { fecha, hora, idcita } = req.query; // Access query parameters using req.query
            console.log("CHECK AVAILABILITY PARAMS: ", fecha, hora, idcita);

            let sqlSelect = `SELECT COUNT(*) AS count FROM citas WHERE fecha = ? AND hora = ?`;
            if (idcita) {
                sqlSelect += ` AND idcita <> ?`;
            }
            const params = [fecha, hora];
            if (idcita) {
                params.push(idcita);
            }
            console.log("CHECK AVAILABILITY QUERY: ", sqlSelect);
            console.log("CHECK AVAILABILITY PARAMS: ", params);
            const connection = await pool.getConnection();
            const [rows, fields] = await connection.query(sqlSelect, params);
            connection.release();

            console.log("CHECK AVAILABILITY RESULT: ", rows[0].count);
            const count = rows[0].count;
            res.json({ available: count === 0 });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });



    //Get a cita by id
    router.get("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();

            const sqlSelect = "SELECT idcita, nombre_persona, estado, idpaciente, correouser, DATE_FORMAT(fecha, '%Y-%m-%d') as fecha, DATE_FORMAT(hora, '%l:%i %p') AS hora, altura, peso, temperatura, ritmo_cardiaco, presion FROM citas WHERE idcita = " + req.params.id;

            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            res.json(rows[0])
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Delete a cita by id
    router.delete("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "delete FROM citas where idcita = " + req.params.id;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            res.json(rows);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Update a patient by id
    router.put("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const { id } = req.params;
            const {
                nombre_persona,
                estado,
                idpaciente,
                correouser,
                fecha,
                hora,
                altura,
                peso,
                temperatura,
                ritmo_cardiaco,
                presion
            } = req.body;

            const q =
                "UPDATE citas SET nombre_persona = ?, estado = ?, idpaciente = ?, correouser = ?, fecha = ?, hora = ?, altura = ?, peso = ?, temperatura = ?, ritmo_cardiaco = ?, presion = ? WHERE idcita = ?";

            const values = [
                nombre_persona,
                estado,
                idpaciente,
                correouser,
                fecha,
                hora,
                altura,
                peso,
                temperatura,
                ritmo_cardiaco,
                presion,
                id
            ];

            await connection.query(q, values);
            connection.release();
            res.json("Cita actualizada exitosamente!");
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    router.get("/availableTimes/:date", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const { date } = req.params;
            const { id } = req.query; // Get the id query parameter (if provided)
            const onlyDate = date.split("T")[0];
            const availableTimes24 = [
                "07:00:00", "07:30:00", "08:00:00", "08:30:00", "09:00:00", "09:30:00", "10:00:00", "10:30:00", "11:00:00", "11:30:00",
                "12:00:00", "12:30:00", "13:00:00", "13:30:00", "14:00:00", "14:30:00", "15:00:00", "15:30:00"
            ];

            // Construct the SQL query to fetch existing times for the given date
            let sqlSelect = `SELECT hora FROM citas WHERE fecha = '${onlyDate}'`;

            if (id) {
                // If id is provided, exclude the appointment with that id from the existing times
                sqlSelect += ` AND idcita <> ${id}`;
            }

            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();

            const existingTimes = rows.map((row) => row.hora);
            const availableTimes = availableTimes24.filter((time) => !existingTimes.includes(time));

            const availableTimesFormatted = availableTimes.map((time) => {
                const [hour, minute] = time.split(":");
                const meridiem = hour >= 12 ? "PM" : "AM";
                const hour12 = hour % 12 || 12;
                return `${hour12}:${minute} ${meridiem}`;
            });

            res.json(availableTimesFormatted);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });


    // const checkAndUpdateExpiredAppointments = async () => {
    //     try {
    //         const connection = await pool.getConnection();

    //         // Get the current date and time
    //         const currentDateTime = new Date();

    //         // Query appointments with ending time that has passed the current time
    //         const sqlSelect = `SELECT idcita, hora_final FROM citas WHERE estado = 'activa' AND hora_final <= ?`;
    //         const [rows, fields] = await connection.query(sqlSelect, [currentDateTime]);

    //         if (rows.length > 0) {
    //             // Update the state of expired appointments to 'expirada'
    //             const expiredIds = rows.map((row) => row.idcita);
    //             const sqlUpdate = `UPDATE citas SET estado = 'expirada' WHERE idcita IN (?)`;
    //             await connection.query(sqlUpdate, [expiredIds]);
    //         }

    //         connection.release();
    //     } catch (err) {
    //         console.log(err);
    //         // Handle any errors that occurred during the process
    //     }
    // };

    // // Function to start the interval for checking and updating expired appointments
    // const startAppointmentCheckingInterval = () => {
    //     // Call the function immediately to check for expired appointments when the server starts
    //     checkAndUpdateExpiredAppointments();

    //     // Set the interval to run the function every 5 minutes (adjust the interval time as needed)
    //     setInterval(checkAndUpdateExpiredAppointments, 5 * 60 * 1000); // 5 minutes in milliseconds
    // };

    // // Call the function to start the checking interval when your server starts
    // startAppointmentCheckingInterval();

    return router;
};

export default citasRouter;
