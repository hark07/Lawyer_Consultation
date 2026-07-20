import Appointment from "../models/Appointment.js";
import Notification from "../models/Notification.js";
import Chat from "../models/Chat.js";
import Lawyer from "../models/Lawyer.js";

// CREATE APPOINTMENT

export const createAppointment = async (req, res) => {
  try {
    const { lawyer, date, time, consultationType, message } = req.body;

    if (!lawyer || !date || !time) {
      return res.status(400).json({
        message: "Lawyer, date and time are required",
      });
    }

    const lawyerProfile = await Lawyer.findById(lawyer);

    if (!lawyerProfile) {
      return res.status(404).json({
        message: "Lawyer not found",
      });
    }

    const existing = await Appointment.findOne({
      lawyer,
      date,
      time,
      status: {
        $in: ["pending", "accepted"],
      },
    });

    if (existing) {
      return res.status(400).json({
        message: "Time slot already booked",
      });
    }

    const appointment = await Appointment.create({
      user: req.user._id,
      lawyer,
      date,
      time,
      consultationType: consultationType || "chat",
      consultationFee: lawyerProfile.consultationFee,
      message,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// USER APPOINTMENTS

export const getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      user: req.user._id,
    })
      .populate("user", "name email phone")
      .populate({
        path: "lawyer",
        populate: {
          path: "user",
          select: "name email phone",
        },
      })
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// MY APPOINTMENTS

export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      user: req.user._id,
    })
      .populate("user", "name email phone")
      .populate({
        path: "lawyer",
        populate: {
          path: "user",
          select: "name email phone",
        },
      })
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// APPOINTMENTS OF SPECIFIC LAWYER

export const getLawyerAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      lawyer: req.params.lawyerId,
    })
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// LOGGED-IN LAWYER APPOINTMENTS

export const getMyLawyerAppointments = async (req, res) => {
  try {
    const lawyer = await Lawyer.findOne({
      user: req.user._id,
    });

    if (!lawyer) {
      return res.status(404).json({
        message: "Lawyer profile not found",
      });
    }

    const appointments = await Appointment.find({
      lawyer: lawyer._id,
    })
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE STATUS

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatus = [
      "pending",
      "accepted",
      "rejected",
      "completed",
      "cancelled",
    ];

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    appointment.status = status;

    await appointment.save();

    // AUTO CREATE CHAT WHEN ACCEPTED

    if (status === "accepted") {
      const existingChat = await Chat.findOne({
        appointment: appointment._id,
      });

      if (!existingChat) {
        const lawyerProfile = await Lawyer.findById(appointment.lawyer);

        if (lawyerProfile) {
          await Chat.create({
            participants: [appointment.user, lawyerProfile.user],
            appointment: appointment._id,
          });
        }
      }
    }

    await Notification.create({
      receiver: appointment.user,
      title: "Appointment Update",
      message: `Your appointment has been ${status}`,
      type: "appointment",
    });

    res.json({
      success: true,
      message: "Appointment updated successfully",
      appointment,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// SINGLE APPOINTMENT

export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("user", "name email phone")
      .populate({
        path: "lawyer",
        populate: {
          path: "user",
          select: "name email phone",
        },
      });

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.json(appointment);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ADMIN ALL APPOINTMENTS

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("user", "name email phone")
      .populate({
        path: "lawyer",
        populate: {
          path: "user",
          select: "name email phone",
        },
      })
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
