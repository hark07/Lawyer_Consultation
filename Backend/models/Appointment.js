import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    lawyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lawyer",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    consultationType: {
      type: String,

      enum: ["chat", "audio", "video"],

      default: "chat",
    },

    status: {
      type: String,

      enum: ["pending", "accepted", "rejected", "completed", "cancelled"],

      default: "pending",
    },

    message: {
      type: String,
    },

    paymentMethod: {
      type: String,
      default: "Cash",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    consultationFee: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
  },
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
