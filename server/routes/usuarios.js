import express from "express";
const router = express.Router();

const usuariosRouter = (pool) => {
    //get all users
    router.get("/usuarios", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT * FROM usuarios ";
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log("Get all usuarios Successfull");
            res.json(rows);
        } catch (err) {
            console.log("Get all usuarios Failed. Error: " + err);
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    router.get('/usuarios', async (req, res) => {
        try {
            const correo = req.params.correo;
            const connection = await pool.getConnection();
            const query = `SELECT * FROM usuarios WHERE correouser = '${correo}'`;
            const [rows] = await connection.query(query);
            connection.release();
            res.json(rows[0]);
        } catch (error) {
            console.log("Login Failed. Error: " + error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Add a new user
    router.post("/usuarios", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const q =
                "INSERT INTO `usuarios` (`correouser`, `nombre`, `edad`, `pregunta`, `respuesta`, `password`) VALUES (?)";
            const values = [
                req.body.correouser,
                req.body.nombre,
                req.body.edad,
                req.body.pregunta,
                req.body.respuesta,
                req.body.password
            ];
            await connection.query(q, [values]);
            connection.release();
            console.log("Post usuarios Successfull");
            res.json("Usuario añadido exitosamente!");
        } catch (err) {
            console.log("Post usuarios Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    //Login
    router.get("/usuarios", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const q = "SELECT * FROM usuarios WHERE correouser = `" + { req } + "`";
            await connection.query(q);
            connection.release();
            console.log("Login Successfull");
            res.json("Verificando");
        } catch (error) {
            console.log("Login Failed. Error: " + error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    // DELETE 
    router.delete('/usuarios/:email', async (req, res) => {
        try {
            const email = req.params.email;
            console.log("FUCKING EMAIL RECIBIDO: " + email);
            const connection = await pool.getConnection();
            const query = `DELETE FROM usuarios WHERE correouser = ?`;
            const [rows] = await connection.query(query, [email]);
            connection.release();
            if (rows.affectedRows > 0) {
                res.status(200).json({ message: 'Usuario eliminado' });
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al eliminar usuario' });
        }
    });

    router.put('/usuarios/:email', async (req, res) => {
        try {
            const { email } = req.params;
            const editedUser = req.body;
            const connection = await pool.getConnection();
            const updateQuery = `
                UPDATE usuarios 
                SET nombre = ?, edad = ?, pregunta = ?, respuesta = ?, password = ?
                WHERE correouser = ?`;
            const updateParams = [
                editedUser.nombre,
                editedUser.edad,
                editedUser.pregunta,
                editedUser.respuesta,
                editedUser.newPassword || editedUser.oldPassword,
                email,
            ];
            const [result] = await connection.query(updateQuery, updateParams);
            connection.release();
            if (result.affectedRows > 0) {
                res.status(200).json({ message: 'Usuario editado' });
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al editar usuario' });
        }
    });


    return router;
};

export default usuariosRouter;