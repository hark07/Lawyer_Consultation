import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createMeeting,
  getMeetingByAppointment,
  startMeeting,
  endMeeting,
} from "../controllers/meetingController.js";

const router = express.Router();

router.use(protect);

// Create Meeting

router.post("/create", createMeeting);

// Get Meeting

router.get("/appointment/:appointmentId", getMeetingByAppointment);

// Start Meeting

router.put("/:id/start", startMeeting);

// End Meeting

router.put("/:id/end", endMeeting);

export default router;
