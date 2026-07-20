import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    lawyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lawyer",
    },

    fileUrl: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
    },

    description: {
      type: String,
    },
  },

  {
    timestamps: true,
  },
);

const Document = mongoose.model("Document", documentSchema);

export default Document;
