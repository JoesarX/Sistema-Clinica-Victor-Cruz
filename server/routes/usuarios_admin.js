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
            console.log("Get all Usuarios Admin Successful!");
            res.json(rows);
        } catch (err) {
            console.log("Get all  Usuarios Admin Failed. Error: " + err);
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
            console.log(`Get  Usuarios Admin by id ${req.params.id} Successful!`);
            res.json(rows[0])
        } catch (err) {
            console.log(`Get  Usuarios Admin by id ${req.params.id} Failed. Error: ${err}`)
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //crear usuario admin
    router.post("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const q =
                "INSERT INTO `usuarios_admin` (`nombre`, `correo`, `rol`, `password`, `telefono`, `sexo`,  `id`) VALUES (?)";
            const values = [
                req.body.nombre,
                req.body.correo,
                req.body.rol,
                req.body.password,
                req.body.telefono,
                req.body.sexo,
                req.body.id
            ];
            await connection.query(q, [values]);
            connection.release();
            console.log("Usuario Admin post successful");
            res.json("Usuario Admin añadido exitosamente!");
        } catch (err) {
            console.log("Usuario Admin post Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //modificar rol de usuario admin
    router.put("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const { id } = req.params;
            const {
                nombre,
                correo,
                rol,
                password,
                telefono,
                sexo
            } = req.body;

            const q =
                "UPDATE usuarios_admin SET nombre = ?, correo = ?, rol = ?, password = ?, telefono = ?, sexo = ? WHERE id = ?";

            const values = [
                nombre,
                correo,
                rol,
                password,
                telefono,
                sexo,
                id
            ];

            await connection.query(q, values);
            connection.release();
            console.log(`Usuarios Admin put ${id} successful`)
            res.json("Admin actualizado exitosamente!");
        } catch (err) {
            console.log(`Usuarios Admin put ${id} failed. Error: ${err}`);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //Eliminar usuario admin 
    router.delete("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "delete FROM usuarios_admin where id = '" + req.params.id + "'";
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Usuarios Admin delete ${req.params.id} successful`)
            res.json(rows);
        } catch (err) {
            console.log(`Usuarios Admin delete ${req.params.id} failed. Error: ${err}`);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    //Para login de admin
    router.get("/usuarios_admin/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT * FROM usuarios_admin WHERE correo= `" + { req } + "`";
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log("Get all Usuarios Admin Usuarios Admin Successful!");
            res.json(rows);
        } catch (err) {
            console.log("Get all  Usuarios Admin Usuarios Admin Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    return router;
};



export default adminRouter;