import express from "express";
import { register, login } from "../controllers/authController.js";
import { validate } from "../middleware/validateMiddleware.js";
import { registerSchema } from "../validators/authValidator.js";

const router = express.Router();

// The 'validate' middleware runs BEFORE the 'register' controller
router.post("/register", validate(registerSchema), register);
router.post("/login", login);

export default router;