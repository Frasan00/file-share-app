import express, { Router } from "express";
import dataValidation from "../middlewares/validationMiddleware";
import { register, login, logout } from "../controllers/authController";

const router = express.Router();
router.post("/register", dataValidation, register);
router.post("/login", dataValidation, login);
router.delete("/logout/:userName", logout);

export default router;