import express from "express";

const router = express.Router();

const adminDashboardRouter = (pool, transporter) => {

    //============================================== G E T S ==================================================================

    //Get payments by paypal and cash
    router.get("/metodoPago", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = `SELECT metodoPago AS name, Count(metodoPago) AS value FROM facturas WHERE metodoPago IS NOT NULL group by metodoPago ORDER BY name`;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Get adminDashboard by financeMetodoPago ${req.params.id} Successfull`)
            res.json(rows)
        } catch (err) {
            console.log("Error in get adminDashboard by financeMetodoPago. " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Get payments by month
    router.get("/paymentsByMonth", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            await connection.query(`SET lc_time_names = 'es_ES';`);
            const sqlSelect = `SELECT DATE_FORMAT(citas.fecha, '%M') AS Mes, SUM(facturas.total) AS Ganancias
                                FROM facturas INNER JOIN citas ON facturas.idCita = citas.idcita
                                WHERE facturas.isPagada = 1 AND citas.fecha >= DATE_SUB(CURRENT_DATE, INTERVAL 5 MONTH)
                                GROUP BY Mes 
                                ORDER BY citas.fecha;`;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Get adminDashboard by financeMetodoPago ${req.params.id} Successfull`)
            res.json(rows)
        } catch (err) {
            console.log("Error in get adminDashboard by financeMetodoPago. " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    router.get("/userCount", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            await connection.query(`SET lc_time_names = 'es_ES';`);
            const sqlSelect = `SELECT COUNT(DISTINCT(correouser)) AS TotalUsers,
                            CAST(
                                SUM(
                                    CASE 
                                        WHEN date_created >= DATE_SUB(NOW(), INTERVAL 1 MONTH) THEN 1
                                        ELSE 0
                                    END
                                ) AS SIGNED
                            ) AS NewUsers
                            FROM usuarios;`;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Get adminDashboard by userCount ${req.params.id} Successfull`)
            res.json(rows[0])
        } catch (err) {
            console.log("Error in get adminDashboard by userCount. " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    router.get("/popularDays", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            await connection.query(`SET lc_time_names = 'es_ES';`);
            const sqlSelect = `SELECT
                                    CASE
                                        WHEN DAYOFWEEK(fecha) = 2 THEN 'Lunes'   -- Monday
                                        WHEN DAYOFWEEK(fecha) = 3 THEN 'Martes'  -- Tuesday
                                        WHEN DAYOFWEEK(fecha) = 4 THEN 'Miércoles' -- Wednesday
                                        WHEN DAYOFWEEK(fecha) = 5 THEN 'Jueves'   -- Thursday
                                        WHEN DAYOFWEEK(fecha) = 6 THEN 'Viernes'  -- Friday
                                    END AS Dia,
                                    COUNT(*) AS Citas_Totales
                                FROM
                                    heroku_9fb29a24254053e.citas
                                WHERE
                                    fecha >= DATE_SUB(NOW(), INTERVAL 6 MONTH) AND DAYOFWEEK(fecha) BETWEEN 2 AND 6
                                GROUP BY
                                    DAYOFWEEK(fecha);`;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Get adminDashboard by popularDays ${req.params.id} Successfull`)
            res.json(rows)
        } catch (err) {
            console.log("Error in get adminDashboard by popularDays. " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    router.get("/popularTimes", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            await connection.query(`SET lc_time_names = 'es_ES';`);
            const sqlSelect = `SELECT
                                    DATE_FORMAT(hora, '%h:%i %p') AS Horario,
                                    COUNT(*) AS Citas_Totales
                                FROM
                                    citas
                                WHERE
                                    fecha >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
                                    AND hora >= '07:00:00' -- Start time
                                    AND hora <= '15:30:00' -- End time
                                GROUP BY
                                    Horario
                                ORDER BY
                                    hora;`;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            const allPossibleTimes = [
                "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", 
                "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM"
            ];
            for( let i = 0; i < 18; i++){
                // console.log("i: " + i + " rows[i].Horario: " + rows[i].Horario + " allPossibleTimes[i]: " + allPossibleTimes[i])
                if(i >= rows.length) rows.push({Horario: allPossibleTimes[i], Citas_Totales: 0})
                else if(!rows[i].Horario.includes(allPossibleTimes[i])){
                    rows.splice(i, 0, {Horario: allPossibleTimes[i], Citas_Totales: 0})
                }
                // console.log(rows)
                // console.log()
            }
            console.log(`Get adminDashboard by popularTimes ${req.params.id} Successfull`)
            res.json(rows)
        } catch (err) {
            console.log("Error in get adminDashboard by popularTimes. " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    return router;
};

export default adminDashboardRouter;