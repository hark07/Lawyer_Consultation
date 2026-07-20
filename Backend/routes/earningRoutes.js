import express from "express";
import protect from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { getLawyerEarnings } from "../controllers/earningController.js";

const router = express.Router();

router.get("/dashboard", protect, authorize("lawyer"), getLawyerEarnings);

export default router;
