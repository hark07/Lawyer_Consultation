import crypto from "crypto";

import Meeting from "../models/Meeting.js";
import Appointment from "../models/Appointment.js";

// CREATE MEETING

export const createMeeting = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.body.appointmentId);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    const existingMeeting = await Meeting.findOne({
      appointment: appointment._id,
    });

    if (existingMeeting) {
      return res.json(existingMeeting);
    }

    const roomId = crypto.randomUUID();

    const meeting = await Meeting.create({
      appointment: appointment._id,

      roomId,

      lawyer: appointment.lawyer,

      user: appointment.user,
    });

    res.status(201).json({
      success: true,
      meeting,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET MEETING BY APPOINTMENT

export const getMeetingByAppointment = async (req, res) => {
  try {
    const meeting = await Meeting.findOne({
      appointment: req.params.appointmentId,
    })
      .populate("user", "name email")
      .populate("lawyer");

    if (!meeting) {
      return res.status(404).json({
        message: "Meeting not found",
      });
    }

    res.json(meeting);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// START MEETING

export const startMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      return res.status(404).json({
        message: "Meeting not found",
      });
    }

    meeting.status = "active";

    meeting.startTime = new Date();

    await meeting.save();

    res.json({
      success: true,
      meeting,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// END MEETING

export const endMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      return res.status(404).json({
        message: "Meeting not found",
      });
    }

    meeting.status = "completed";

    meeting.endTime = new Date();

    await meeting.save();

    res.json({
      success: true,
      meeting,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
