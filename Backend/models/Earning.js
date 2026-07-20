import mongoose from "mongoose";

const earningSchema = new mongoose.Schema(
  {
    lawyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lawyer",
      required: true,
    },

    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "paid",
    },
  },
  {
    timestamps: true,
  },
);

const Earning = mongoose.model("Earning", earningSchema);

export default Earning;
