import express from "express";

import {
  createReview,
  getAllReviews,
  getLawyerReviews,
} from "../controllers/reviewController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Review

router.post("/", protect, createReview);

router.get("/", getAllReviews);

// Get Reviews

router.get("/:lawyerId", getLawyerReviews);

export default router;
