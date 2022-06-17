import express from 'express';
import { check } from 'express-validator';
import checkAuth from '../middleware/checkAuth.js';
import checkRole from "../middleware/checkRole.js";
import { roles } from '../common/constants/constants.js';
import {    
    addUserTeam,
    removeUserTeam
} from '../controllers/accountController.js'

const router = express.Router();

//Equipos
//Agregar usuarios de los equipos
router.put('/', addUserTeam);
//Quitar usuarios de los equipos
router.delete('/team', checkRole([roles.admin, roles.superadmin]), checkAuth, removeUserTeam);

export default router;