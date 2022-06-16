import dotenv from "dotenv";
import express from "express";
import conectarDB from "./config/db.js";
import cors from "cors";

import usersRouter from "./routes/usersRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import {logger} from './config/logger.js'

const app = express();
dotenv.config();
conectarDB();

import swaggerUi from "swagger-ui-express";
import { readFile } from "fs/promises";
// const swaggerDocument = JSON.parse( 
//   await readFile(new URL("./swagger.json", import.meta.url))
// );
app.use(cors());
app.use(express.json());
//Rounting
//app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/users", usersRouter);
app.use("/api/account", accountRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'test') {
    logger.error(`servidor corriendo en el puerto ${PORT}`);
  }  
});

export { app, server };
