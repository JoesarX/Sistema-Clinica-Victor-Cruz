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
            console.log("Get all citas Successfull");
            res.json(rows);
        } catch (err) {
            console.log("Get all citas Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    router.get('/filtrarCitasTabla/:estado', async (req, res) => {
        try {
            const estado = req.params.estado;
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT idcita, nombre_persona, estado, idpaciente, correouser, DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha, DATE_FORMAT(hora, '%l:%i %p') AS hora, altura, peso, temperatura, ritmo_cardiaco, presion FROM citas WHERE estado = ?";

            const [rows, fields] = await connection.query(sqlSelect, [estado]);
            connection.release();
            console.log("Get all citas Successfull");
            res.json(rows);
        } catch (err) {
            console.log("Get all citas Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    router.get('/citasPasadas/:status', async (req, res) => {
        try {
            const status = req.params.status;
            const connection = await pool.getConnection();
            await connection.query(`SET time_zone = 'America/Guatemala';`);
            let sqlSelect = "SELECT idcita, nombre_persona, estado, idpaciente, correouser, DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha, DATE_FORMAT(hora, '%l:%i %p') AS hora, altura, peso, temperatura, ritmo_cardiaco, presion FROM citas order by fecha, citas.hora";
            if (status == 'Hoy') {
                sqlSelect = "SELECT idcita, nombre_persona, estado, idpaciente, correouser, DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha, DATE_FORMAT(hora, '%l:%i %p') AS hora, altura, peso, temperatura, ritmo_cardiaco, presion FROM citas WHERE fecha = CURDATE() order by fecha, citas.hora";
            } else if (status == 'Futuras') {
                sqlSelect = "SELECT idcita, nombre_persona, estado, idpaciente, correouser, DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha, DATE_FORMAT(hora, '%l:%i %p') AS hora, altura, peso, temperatura, ritmo_cardiaco, presion FROM citas WHERE fecha >= CURDATE() order by fecha, citas.hora";
            }
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log("Get all citas by Filter Successfull");
            res.json(rows);
        } catch (err) {
            console.log("Get all citas by Filter Failed. Error: " + err);
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
            await connection.query(q, [values]);
            connection.release();
            console.log("Post cita Successfull");
            res.json("Cita añadida exitosamente!");
        } catch (err) {
            console.log("Post cita Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    router.get('/checkAvailability', async (req, res) => {
        try {
            const { fecha, hora, idcita } = req.query; // Access query parameters using req.query
            let sqlSelect = `SELECT COUNT(*) AS count FROM citas WHERE fecha = ? AND hora = ?`;
            if (idcita) {
                sqlSelect += ` AND idcita <> ?`;
            }
            const params = [fecha, hora];
            if (idcita) {
                params.push(idcita);
            }
            const connection = await pool.getConnection();
            const [rows, fields] = await connection.query(sqlSelect, params);
            connection.release();
            console.log(`Check Availability succesfull for ${fecha} ${hora}`)
            console.log("Check Availability Result: ", rows[0].count);
            const count = rows[0].count;
            res.json({ available: count === 0 });
        } catch (err) {
            console.log(`Check Availability failed for ${fecha} ${hora}. Error: ${err}`)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    //get citas linked a expediente linked a usuario
    router.get("/citasexpedientes/:correouser", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "select distinct C.idcita, C.nombre_persona, C.estado, C.idpaciente, C.correouser, C.altura, C.peso, C.temperatura, C.ritmo_cardiaco, C.presion, C.fecha, C.hora, C.correoenviado " +
                "from Usuarios U " +
                "inner join expedientes E on U.correouser = E.correo " +
                "inner join Citas C on E.correo = C.correouser " +
                "where U.correouser = '" + req.params.correouser + "'";

            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Get cita with correo: ${req.params.correouser} Successfull`)
            res.json(rows)
        } catch (err) {
            console.log(`Get cita with correo: ${req.params.correouser} Failed. Error: ${err}`)
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    router.get("/availableTimesRange/:option", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const today = new Date();
            // const twoWeeksLater = new Date(today);
            // twoWeeksLater.setDate(today.getDate() + 14); // Add 14 days to today

            const availableTimes = [];


            // Loop through each day within the date range
            let currentDate = new Date(today);
            let isToday = (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) ? true : false;
            let weekCounter = 0
            while (weekCounter <= 2) {
                //console.log("currentDate:" + currentDate)
                //console.log("isToday:" + isToday)

                if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) { // Skip weekends
                    const formattedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).toISOString().slice(0, 10);
                    //console.log("day:" + currentDate.getDate)
                    //console.log("formattedDate:" + formattedDate)

                    // Generate all possible times for a day
                    const allPossibleTimes = [
                        "07:00:00", "07:30:00", "08:00:00", "08:30:00", "09:00:00", "09:30:00", "10:00:00", "10:30:00", "11:00:00", "11:30:00",
                        "12:00:00", "12:30:00", "13:00:00", "13:30:00", "14:00:00", "14:30:00", "15:00:00", "15:30:00"
                    ];

                    // Fetch reserved times for the current date from the database (similar to getAvailableTimes)
                    let sqlSelect = `SELECT hora FROM citas WHERE fecha = '${formattedDate}'`;
                    const [rows, fields] = await connection.query(sqlSelect);

                    const existingTimes = rows.map((row) => row.hora);

                    const currentTime = new Date().toLocaleTimeString("en-US", { hour12: false });

                    // Filter out reserved times and times earlier than the current time
                    let availableTimesForDate = null;

                    if (isToday) {
                        availableTimesForDate = allPossibleTimes.filter(
                            (time) => !existingTimes.includes(time) && time >= currentTime
                        );
                        isToday = false;
                    } else {
                        availableTimesForDate = allPossibleTimes.filter((time) => !existingTimes.includes(time));
                    }


                    // Format available times and add to the list
                    const availableTimesFormatted = availableTimesForDate.map((time) => {
                        const [hour, minute] = time.split(":");
                        const meridiem = hour >= 12 ? "PM" : "AM";
                        const hour12 = hour % 12 || 12;
                        return `${hour12}:${minute} ${meridiem}`;
                    });


                    if (req.params.option === '1') {
                        availableTimes.push({
                            date: formattedDate,
                            times: availableTimesFormatted
                        });
                    } else {
                        for(let i = 0; i < availableTimesFormatted.length; i++) {
                            availableTimes.push({
                                date: formattedDate,
                                time: availableTimesFormatted[i]
                            });
                        }
                    }

                    // Move to the next day
                } else if (currentDate.getDay() === 6) {
                    weekCounter++;
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
            connection.release();
            console.log("Get available times range Successfull");
            res.json(availableTimes);
        } catch (err) {
            console.log("Get available times range Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });


    //Get a cita by id
    router.get("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT idcita, nombre_persona, estado, idpaciente, correouser, DATE_FORMAT(fecha, '%Y-%m-%d') as fecha, DATE_FORMAT(hora, '%l:%i %p') AS hora, altura, peso, temperatura, ritmo_cardiaco, presion FROM citas WHERE idcita = " + req.params.id;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Get cita with id: ${req.params.id} Successfull`)
            res.json(rows[0])
        } catch (err) {
            console.log(`Get cita with id: ${req.params.id} Failed. Error: ${err}`)
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
            console.log(`Delete cita with id: ${req.params.id} Successfull`)
            res.json(rows);
        } catch (err) {
            console.log(`Delete cita with id: ${req.params.id} Failed. Error: ${err}`)
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
            console.log(`Update cita with id: ${id} Successfull`)
            res.json("Cita actualizada exitosamente!");
        } catch (err) {
            console.log(`Update cita with id: ${id} Failed. Error: ${err}`)
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

            console.log(`Get available times for date: ${date} Successfull`)
            console.log(`Available times: ${availableTimesFormatted}`)
            res.json(availableTimesFormatted);
        } catch (err) {
            console.log(`Get available times for date: ${date} Failed. Error: ${err}`)
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    const checkAndUpdateExpiredAppointments = async () => {
        try {
            const connection = await pool.getConnection();
            await connection.query("SET time_zone = 'America/Guatemala'");
            // Citas donde la Fecha es menor a la actual o la fecha es igual a la actual y la hora es menor a la actual
            const sqlSelect = `SELECT idcita FROM citas WHERE estado = 'Pendiente' AND curdate() >= fecha`;
            const [rows, fields] = await connection.query(sqlSelect);

            console.log(`Check and update expired appointments Start`)

            if (rows.length > 0) {
                // Cambiar cada una a expirada
                const expiredIds = rows.map((row) => row.idcita);
                console.log(`Expired appointments: ${expiredIds}`)
                const sqlUpdate = `UPDATE citas SET estado = 'Expirada' WHERE idcita IN (?)`;
                await connection.query(sqlUpdate, [expiredIds]);
            }

            connection.release();
            console.log("Check and update expired appointments Successfull\n")
        } catch (err) {
            console.log(`Check and update expired appointments Failed. Error: ${err}`)
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

            console.log(`Send appointment reminders Start`)
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
            console.log("Send appointment reminders Successfull\n")
        } catch (err) {
            console.log("Send appointment reminders Failed. Error: " + err);
        }
    };


    const startAppointmentCheckingInterval = () => {

        const keepServerAwake = () => {
            console.log("\nKeeping Server On\n");
        };
        setInterval(keepServerAwake, 10 * 60 * 1000);

        // Set up intervalo para mandar correos de recordatorio de citas
        const millisecondsInADay = 24 * 60 * 60 * 1000;
        const now = new Date();
        const targetTimeEmails = new Date(now);
        targetTimeEmails.setHours(9, 0, 0, 0); // Aqui se puede cambiar la hora a la que se mandan los correo
        const targetTimeTerminate = new Date(now);
        targetTimeTerminate.setHours(17, 0, 0, 0); // Aqui se puede cambiar la hora a la que se terminan las citas

        let timeUntilNextDayEmail = targetTimeEmails - now;
        let timeUntilNextDayTerminate = targetTimeTerminate - now;
        console.log("Email Reminder Interval Start")
        console.log("Target Time Emails: " + targetTimeEmails)
        console.log("Target Time Terminate: " + targetTimeTerminate)

        if (timeUntilNextDayEmail < 0) {
            timeUntilNextDayEmail += millisecondsInADay;
        }
        if (timeUntilNextDayTerminate < 0) {
            timeUntilNextDayTerminate += millisecondsInADay;
        }
        console.log("Time Until Next Day Emails: " + timeUntilNextDayEmail)
        console.log("Time Until Next Day Terminate: " + timeUntilNextDayTerminate)

        setTimeout(() => {
            sendAppointmentReminders();
            console.log("Email Reminder Interval Successfull")
            setInterval(sendAppointmentReminders, millisecondsInADay);
        }, timeUntilNextDayEmail);

        setTimeout(() => {
            checkAndUpdateExpiredAppointments();
            console.log("Terminate Citas Interval Successfull")
            setInterval(checkAndUpdateExpiredAppointments, millisecondsInADay);
        }, timeUntilNextDayTerminate);

    };

    //llamado a la busqueda continua de citas expiradas
    startAppointmentCheckingInterval();

    return router;
};

export default citasRouter;
