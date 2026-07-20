import express from "express";

import {
  dashboardStats,
  getUsers,
  getPendingLawyers,
  approveLawyer,
  rejectLawyer,
  analytics,
  addLawyer,
  getAllLawyers,
  updateLawyer,
  deleteLawyer,
} from "../controllers/adminController.js";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// All Admin Routes Protected

router.use(protect, adminOnly);

// Dashboard

router.get("/dashboard", dashboardStats);

// Users

router.get("/users", getUsers);

// Pending Lawyers

router.get("/lawyers/pending", getPendingLawyers);

// Approve Lawyer

router.put("/lawyers/:id/approve", approveLawyer);

// Reject Lawyer

router.put("/lawyers/:id/reject", rejectLawyer);

// Analytics

router.get("/analytics", analytics);

// =======================
// Lawyer CRUD
// =======================

// Add Lawyer + Image Upload

router.post("/lawyers", upload.single("profileImage"), addLawyer);

// Get All Lawyers

router.get("/lawyers", getAllLawyers);

// Update Lawyer + Image Update

router.put("/lawyers/:id", upload.single("profileImage"), updateLawyer);

// Delete Lawyer

router.delete("/lawyers/:id", deleteLawyer);

export default router;
