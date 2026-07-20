import mongoose from "mongoose";

const lawyerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    profileImage: {
      type: String,
    },

    specialization: [
      {
        type: String,
      },
    ],

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LegalCategory",
      required: true,
    },

    qualification: {
      type: String,
      required: true,
    },

    experience: {
      type: Number,
      required: true,
    },

    barRegistration: {
      type: String,
      required: true,
      unique: true,
    },

    location: {
      type: String,
      required: true,
    },

    consultationFee: {
      type: Number,
      required: true,
    },

    bio: {
      type: String,
    },

    profileImage: {
      type: String,
    },

    documents: [
      {
        type: String,
      },
    ],

    availability: [
      {
        day: {
          type: String,
          required: true,
          enum: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },

        startTime: {
          type: String,
          required: true,
        },

        endTime: {
          type: String,
          required: true,
        },
      },
    ],

    verificationStatus: {
      type: String,

      enum: ["pending", "approved", "rejected"],

      default: "pending",
    },

    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },
  },

  {
    timestamps: true,
  },
);

const Lawyer = mongoose.model("Lawyer", lawyerSchema);

export default Lawyer;
