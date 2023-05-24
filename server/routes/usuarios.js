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
            res.json(rows);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    

   //Para login de admin
   router.get("/usuarios_admin/", async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const sqlSelect = "SELECT * FROM usuarios_admin ";
        const [rows, fields] = await connection.query(sqlSelect);
        connection.release();
        res.json(rows);
    } catch (err) {
        console.log(err);
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
            res.json("Usuario añadido exitosamente!");
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
     //Login
     router.get("/usuarios",async (req,res)=>{
        try{
            const connection = await pool.getConnection();
            const q = "SELECT * FROM usuarios WHERE correouser = `"+{req}+"`";
            await connection.query(q);
            connection.release();
            res.json("Verificando");
        }catch(error){
            console.log("fijate acá:"+ error)
        }
    });
    
    return router;
};

export default usuariosRouter;