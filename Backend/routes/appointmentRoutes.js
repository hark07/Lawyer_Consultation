import express from "express";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

import {
  createAppointment,
  getUserAppointments,
  getMyAppointments,
  getLawyerAppointments,
  getMyLawyerAppointments,
  updateAppointmentStatus,
  getAppointmentById,
  getAllAppointments,
} from "../controllers/appointmentController.js";

const router = express.Router();

// Protected Routes
router.use(protect);

// Create Appointment
router.post("/", createAppointment);

// Current User Appointments
router.get("/my", getMyAppointments);

// User Appointments
router.get("/user", getUserAppointments);

// Logged-in Lawyer Appointments
router.get("/lawyer", getMyLawyerAppointments);

// Specific Lawyer Appointments
router.get("/lawyer/:lawyerId", getLawyerAppointments);

// Update Appointment Status
router.put("/:id/status", updateAppointmentStatus);

// Single Appointment
router.get("/:id", getAppointmentById);

// Admin - All Appointments
router.get("/", adminOnly, getAllAppointments);

export default router;
