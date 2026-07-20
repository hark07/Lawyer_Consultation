import express from "express";

import {
  createConsultation,
  getUserConsultations,
  getLawyerConsultations,
  updateConsultation,
} from "../controllers/consultationController.js";

import protect from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(protect);

// Create

router.post("/create", authorize("lawyer", "admin"), createConsultation);

// User History

router.get("/user", getUserConsultations);

// Lawyer History

router.get("/lawyer/:lawyerId", getLawyerConsultations);

// Update

router.put("/:id", updateConsultation);

export default router;
