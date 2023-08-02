import express from "express";

const router = express.Router();

const citasRouter = (pool, transporter) => {

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

    router.get('/filtrarCitasTabla/:estado', async (req, res) => {
        try {
            console.log("Entro al Filtro")
            console.log(req.params)
            console.log(req.params.estado)
            const estado = req.params.estado;
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT * FROM citas WHERE estado = ?";
            const [rows, fields] = await connection.query(sqlSelect, [estado]);
            console.log(rows)
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


    const checkAndUpdateExpiredAppointments = async () => {
        try {
            const connection = await pool.getConnection();
            await connection.query("SET time_zone = 'America/Guatemala'");
            // Citas donde la Fecha es menor a la actual o la fecha es igual a la actual y la hora es menor a la actual
            const sqlSelect = `SELECT idcita FROM citas WHERE estado = 'Pendiente' AND (curdate() > fecha or (curdate() = fecha and (CURRENT_TIME() - INTERVAL 30 MINUTE) > hora));`;
            const [rows, fields] = await connection.query(sqlSelect);

            console.log(rows);

            if (rows.length > 0) {
                // Cambiar cada una a expirada
                const expiredIds = rows.map((row) => row.idcita);
                const sqlUpdate = `UPDATE citas SET estado = 'Terminada' WHERE idcita IN (?)`;
                await connection.query(sqlUpdate, [expiredIds]);
            }

            connection.release();
            console.log("5 Seconds")
        } catch (err) {
            console.log(err);
        }
    };



    const sendAppointmentReminders = async () => {
        try {
            const connection = await pool.getConnection();
            await connection.query(`SET time_zone = 'America/Guatemala';`);
            await connection.query(`SET lc_time_names = 'es_ES';`);
            const sqlSelect = `SELECT distinct idcita, nombre_persona, correouser, expedientes.correo as correoexpediente ,DATE_FORMAT(fecha, '%W %e de %M del %Y') AS fecha, 
                            DATE_FORMAT(hora, '%l:%i %p') AS hora FROM citas LEFT JOIN expedientes on citas.idpaciente = expedientes.idpaciente 
                            WHERE estado = 'Pendiente' AND correoenviado = 0 
                            AND (not(correouser IS NULL OR correouser = '') or not(expedientes.correo IS NULL OR expedientes.correo = '')) 
                            AND fecha = curdate() + INTERVAL 1 DAY;`;
            const [rows, fields] = await connection.query(sqlSelect);
            console.log("Citas a las que enviar correos hoy:\n" + rows + "\nFin de citas a las que enviar correos hoy\n");

            if (rows.length > 0) {
                for (const row of rows) {
                    const {
                        idcita,
                        nombre_persona,
                        correouser,
                        correoexpediente,
                        fecha,
                        hora,
                    } = row;

                    // Agregar correos a la lista de correos
                    let toEmails = [];
                    if (correouser && correouser.trim() !== "") {
                        toEmails.push(correouser);
                    }
                    if (
                        correoexpediente &&
                        correoexpediente.trim() !== "" &&
                        correoexpediente !== correouser
                    ) {
                        toEmails.push(correoexpediente);
                    }

                    // Mandar Correo
                    if (toEmails.length > 0) {
                        const mailOptions = {
                            from: '"Clinica Dr Victor Cruz" <ClinicaVictorCruz@gmail.com>',
                            to: toEmails.join(", "), // Join multiple emails with a comma and space
                            subject: "Recordatorio de Cita Clinica Dr Victor Cruz",
                            text: `Estimado/a ${nombre_persona}, Le recordamos cordialmente de su cita para mañana, ${fecha}, a las ${hora}. Esperamos brindarle el mejor servicio en nuestra clínica.\n` +
                                `Si tiene alguna duda o necesita cambiar la cita, no dude en contactarnos.\n` +
                                `¡Que tenga un buen día!\n\n` +
                                `Atentamente,\n` +
                                `El equipo de la Clínica Dr. Victor Cruz`,

                        };

                        await transporter.sendMail(mailOptions);
                        console.log(`Reminder email sent for ${toEmails.join(", ")}`);
                    }

                    // Marcar la cita como enviada
                    const sqlUpdate = `UPDATE citas SET correoenviado = '1' WHERE idcita = ?`;
                    await connection.query(sqlUpdate, [idcita]);
                }
            }


            connection.release();
        } catch (err) {
            console.log(err);
        }
    };


    const startAppointmentCheckingInterval = () => {
        // LLamado inicial cuando encienda el server para que no tenga que esperar 5 minutos para cancelar citas expiradas
        checkAndUpdateExpiredAppointments();
        setInterval(checkAndUpdateExpiredAppointments, 5 * 60 * 1000);

        // Set up intervalo para mandar correos de recordatorio de citas
        const millisecondsInADay = 24 * 60 * 60 * 1000;
        const now = new Date();
        const targetTime = new Date(now);
        targetTime.setHours(15, 30, 0, 0); // Aqui se puede cambiar la hora a la que se mandan los correos

        let timeUntilNextDay = targetTime - now;
        if (timeUntilNextDay < 0) {
            // Si ya paso la hora de mandar correos, esperar hasta la misma hora del dia siguiente
            timeUntilNextDay += millisecondsInADay;
        }

        setTimeout(() => {
            sendAppointmentReminders();
            setInterval(sendAppointmentReminders, millisecondsInADay);
        }, timeUntilNextDay);

    };

    //llamado a la busqueda continua de citas expiradas
    startAppointmentCheckingInterval();

    return router;
};

export default citasRouter;
