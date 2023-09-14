import express from "express";
import dotenv from 'dotenv';
dotenv.config();


const router = express.Router();

  const keysRouter = (pool) => {

    //============================================== G E T S ==================================================================
    //Get key
    router.get("/", async (req, res) => {
        try {
            const clientID = process.env.REACT_APP_CLIENT_ID;
            const secret = process.env.REACT_APP_SECRET;
            //const apiKey2 = process.env.API_KEY_2;
            console.log("Get key Successfull");
            res.json({ clientID, secret });
        } catch (err) {
            console.log("Get key Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    return router;
  };

export default keysRouter;
