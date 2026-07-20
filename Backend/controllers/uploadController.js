import Document from "../models/Document.js";

export const uploadDocument = async (req, res) => {
  try {
    const document = await Document.create({
      user: req.user.id,

      fileUrl: req.file.path,

      fileType: req.file.mimetype,

      description: req.body.description,
    });

    res.status(201).json({
      message: "Document uploaded",

      document,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
