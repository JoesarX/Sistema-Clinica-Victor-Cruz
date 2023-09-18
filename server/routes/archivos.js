import express from "express";
const router = express.Router();

const ArchivosRouter = (pool) => {
    //get all Archivos
    router.get("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT * FROM archivos where idpaciente = " + req.params.id;
            const rows = await connection.query(sqlSelect);
            connection.release();
            res.json(rows[0]);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });


    //Add a new archivo
    router.post("/", async (req, res) => {
        const filename = req.body.filename;
        const filetype = req.body.filetype;
        const url = req.body.url;
        const idpaciente = req.body.idpaciente;
     
        try {
            const connection = await pool.getConnection();

            const q =
                "INSERT INTO archivos (filename,filetype,url,idpaciente) VALUES (?)";

            const values = [
                filename,
                filetype,
                url,
                idpaciente
            ];
            await connection.query(q, [values]);
            connection.release();
            res.json("Archivo añadida exitosamente!");
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    //delete Archivo
    router.delete("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = `delete FROM archivos where id = + "${req.params.id}"`;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Delete archivo ${req.params.id} Successfull`)
            res.json(rows);
        } catch (err) {
            console.log(`Delete archivo ${req.params.id} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    return router;
};

export default ArchivosRouter;