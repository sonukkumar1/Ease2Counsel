import express from 'express';
import { login, register, loginAdmin } from '../controllers/auth.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/login/admin", loginAdmin);

export default router;