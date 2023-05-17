import express from "express";

const router = express.Router();

const pacientesRouter = (pool) => {
  router.get("/", async (req, res) => {
    try {
      const connection = await pool.getConnection();
      const sqlSelect = "SELECT * FROM pacientes";
      const [rows, fields] = await connection.query(sqlSelect);
      connection.release();
      res.json(rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const connection = await pool.getConnection();
      const q =
        "INSERT INTO pacientes (`nombre_completo`, `estado_civil`, `edad`, `correo`, `telefono`, `direccion`, `numero_identidad`, `padecimientos`) VALUES (?)";
      const values = [
        req.body.nombre_completo,
        req.body.estado_civil,
        req.body.edad,
        req.body.correo,
        req.body.telefono,
        req.body.direccion,
        req.body.numero_identidad,
        req.body.padecimientos,
      ];
      await connection.query(q, [values]);
      connection.release();
      res.json("Paciente añadido exitosamente!");
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  return router;
};

export default pacientesRouter;
