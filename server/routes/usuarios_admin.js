import express from "express";

const router = express.Router();

const adminRouter = (pool) => {

    //get all admins
    router.get("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "select * from usuarios_admin";
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            res.json(rows);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //get admin by id
    router.get("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT * FROM usuarios_admin WHERE id =" + req.params.id;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            res.json(rows[0])
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //crear usuario admin
    router.post("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const q =
                "INSERT INTO `usuarios_admin` (`nombre`, `correo`, `rol`, `password`, `telefono`, `sexo`) VALUES (?)";
            const values = [
                req.body.nombre,
                req.body.correo,
                req.body.rol,
                req.body.password,
                req.body.telefono,
                req.body.sexo
            ];
            await connection.query(q, [values]);
            connection.release();
            res.json("Usuario Admin añadido exitosamente!");
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //modificar rol de usuario admin
    router.put("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const { id } = req.params;
            const {
                rol,
                nombre,
                correo,
                password,
                sexo,
                telefono
            } = req.body;

            const q =
                "UPDATE usuarios_admin SET rol = ?, nombre = ?, correo = ?, password = ?, rol = ?, sexo = ?, telefono = ? WHERE id = ?";

            const values = [
                rol,
                nombre,
                correo,
                password,
                sexo,
                telefono,
                id
            ];

            await connection.query(q, values);
            connection.release();
            res.json("Admin actualizado exitosamente!");
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Eliminar usuario admin 
    router.delete("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "delete FROM usuarios_admin where id = " + req.params.id;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            res.json(rows);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    return router;
};

export default adminRouter;