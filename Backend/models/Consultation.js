import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema(
  {
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },

    lawyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lawyer",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    notes: {
      type: String,
    },

    duration: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,

      enum: ["started", "completed"],

      default: "started",
    },
  },

  {
    timestamps: true,
  },
);

const Consultation = mongoose.model("Consultation", consultationSchema);

export default Consultation;
