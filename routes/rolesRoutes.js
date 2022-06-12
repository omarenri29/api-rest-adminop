import express from "express";
import { getRoles, getRolById, addRol, updateRol } from "../controllers/roleController.js";
const rolesRoutes = express.Router();
rolesRoutes.get("/", getRoles);
rolesRoutes.get("/:id", getRolById);
rolesRoutes.post("/", addRol);
rolesRoutes.put("/:id", updateRol);

export default rolesRoutes;
