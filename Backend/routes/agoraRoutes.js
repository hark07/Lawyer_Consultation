import express from "express";

import protect from "../middleware/authMiddleware.js";

import { generateToken } from "../controllers/agoraController.js";

const router = express.Router();

router.use(protect);

router.post("/token", generateToken);

export default router;
