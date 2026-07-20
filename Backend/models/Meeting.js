import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
      unique: true,
    },

    roomId: {
      type: String,
      required: true,
      unique: true,
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

    status: {
      type: String,
      enum: ["scheduled", "active", "completed", "cancelled"],
      default: "scheduled",
    },

    startTime: Date,

    endTime: Date,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Meeting", meetingSchema);
