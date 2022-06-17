import express from 'express';
import { check } from 'express-validator';
import checkAuth from '../middleware/checkAuth.js';
import checkRole from "../middleware/checkRole.js";
import { roles } from '../common/constants/constants.js';
import {
    getAccounts,
    getAccountById,
    createAccount,
    updateAccount,
    delateAccount,
    addUserTeam,
    removeUserTeam
} from '../controllers/accountController.js'

const router = express.Router();
//Crear cuenta
router.post('/', checkRole([roles.admin, roles.superadmin]), checkAuth,
    [
        check('name_account', 'El nombre de la cuenta es obligatorio').notEmpty(),
        check('name_client', 'El nombre del cliente es obligatorio').notEmpty(),
        check('name_responsible', 'El nombre del responsable cuenta es obligatorio').notEmpty()
    ],
    createAccount);
//Obtener todas las cuentas
router.get('/', checkRole([roles.admin, roles.superadmin]), checkAuth, getAccounts);
//Obtener cuenta por id
router.get('/:id', checkRole([roles.admin, roles.superadmin]), checkAuth, getAccountById);
//Actualizar cuenta
router.put('/:id', checkRole([roles.admin, roles.superadmin]), checkAuth, updateAccount);
//Eliminar Cuenta
router.delete('/:id', checkRole([roles.admin, roles.superadmin]), checkAuth, delateAccount);


//Equipos
//Agregar usuarios de los equipos
router.put('/team/', addUserTeam);
//Quitar usuarios de los equipos
router.delete('/team', checkRole([roles.admin, roles.superadmin]), checkAuth, removeUserTeam);

export default router;