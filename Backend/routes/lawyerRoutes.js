import express from "express";

import {
  createLawyerProfile,
  getLawyers,
  getLawyerById,
  searchLawyers,
  updateAvailability,
  getAvailability,
} from "../controllers/lawyerController.js";

import protect from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Create Profile

router.post("/create", protect, authorize("lawyer"), createLawyerProfile);

// All Lawyers

router.get("/", getLawyers);

// Search

router.get("/search", searchLawyers);

// Single Lawyer

router.get("/:id", getLawyerById);

// Lawyer Availability

router.put("/availability", protect, authorize("lawyer"), updateAvailability);

router.get("/:id/availability", getAvailability);

export default router;
