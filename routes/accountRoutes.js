import express from 'express';
import { check } from 'express-validator';
import checkAuth from '../middleware/checkAuth.js';
const router = express.Router();

import {
    getAccounts,
    getAccountById,
    createAccount,
    updateAccount,
    delateAccount
} from '../controllers/accountController.js'

//Crear cuenta
router.post('/', checkAuth,
    [
        check('name_account', 'El nombre de la cuenta es obligatorio').notEmpty(),
        check('name_client', 'El nombre del cliente es obligatorio').notEmpty(),
        check('name_responsible', 'El nombre del responsable cuenta es obligatorio').notEmpty()
    ],
    createAccount);
//Obtener todas las cuentas
router.get('/', checkAuth, getAccounts);
//Obtener cuenta por id
router.get('/:id', checkAuth, getAccountById);
//Actualizar cuenta
router.put('/:id', checkAuth, updateAccount);
//Eliminar Cuenta
router.delete('/:id', checkAuth, delateAccount);

export default router;