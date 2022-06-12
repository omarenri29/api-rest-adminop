import express from 'express';
import { check } from 'express-validator';
import checkAuth from '../middleware/checkAuth.js';
const router = express.Router();

import { authenticateUser } from '../controllers/authController.js';

router.post('/', authenticateUser);


export default router;