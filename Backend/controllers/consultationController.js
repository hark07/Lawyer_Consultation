import Consultation from "../models/Consultation.js";
import Earning from "../models/Earning.js";

// CREATE CONSULTATION

export const createConsultation = async (req, res) => {
  try {
    const {
      appointment,

      lawyer,

      user,

      notes,

      duration,
    } = req.body;

    const consultation = await Consultation.create({
      appointment,

      lawyer,

      user,

      notes,

      duration,
    });

    res.status(201).json({
      message: "Consultation created",

      consultation,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET USER CONSULTATION HISTORY

export const getUserConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find({
      user: req.user.id,
    })
      .populate("lawyer")
      .populate("appointment");

    res.json(consultations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET LAWYER CONSULTATIONS

export const getLawyerConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find({
      lawyer: req.params.lawyerId,
    }).populate("user", "name email");

    res.json(consultations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE NOTES

export const updateConsultation = async (req, res) => {
  try {
    if (req.user.role !== "lawyer" && req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const consultation = await Consultation.findById(req.params.id);

    if (!consultation) {
      return res.status(404).json({
        message: "Consultation not found",
      });
    }

    consultation.notes = req.body.notes || consultation.notes;

    consultation.duration = req.body.duration || consultation.duration;

    consultation.status = "completed";

    await consultation.save();

    // Get appointment details
    const appointment = await Appointment.findById(consultation.appointment);

    // Create earning entry
    if (appointment) {
      const existingEarning = await Earning.findOne({
        appointment: appointment._id,
      });

      if (!existingEarning) {
        await Earning.create({
          lawyer: consultation.lawyer,
          appointment: appointment._id,
          amount: appointment.consultationFee || 0,
        });
      }
    }

    res.json({
      message: "Consultation completed successfully",
      consultation,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
