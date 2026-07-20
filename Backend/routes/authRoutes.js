import express from "express";
import { register, login, logout, getProfile, updateProfile } from "../controllers/authController.js";

import { registerValidation } from "../validators/authValidator.js";

import validate from "../middleware/validationMiddleware.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerValidation, validate, register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

export default router;
