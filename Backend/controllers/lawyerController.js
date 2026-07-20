import Lawyer from "../models/Lawyer.js";

// CREATE LAWYER PROFILE

export const createLawyerProfile = async (req, res) => {
  try {
    const lawyerExist = await Lawyer.findOne({
      user: req.user.id,
    });

    if (lawyerExist) {
      return res.status(400).json({
        message: "Lawyer profile already exists",
      });
    }

    const lawyer = await Lawyer.create({
      user: req.user.id,

      ...req.body,
    });

    res.status(201).json({
      message: "Lawyer profile created",

      lawyer,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL LAWYERS

export const getLawyers = async (req, res) => {
  try {
    const lawyers = await Lawyer.find({
      verificationStatus: "approved",
    })
      .populate("user", "name email phone")
      .populate("category", "name");

    res.status(200).json(lawyers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE LAWYER

export const getLawyerById = async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id).populate(
      "user",
      "name email",
    );

    if (!lawyer) {
      return res.status(404).json({
        message: "Lawyer not found",
      });
    }

    res.json(lawyer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// SEARCH LAWYER

export const searchLawyers = async (req, res) => {
  try {
    const { specialization, location, experience, minFee, maxFee } = req.query;

    let filter = {
      verificationStatus: "approved",
    };

    if (specialization) {
      filter.specialization = {
        $in: [specialization],
      };
    }

    if (location) {
      filter.location = {
        $regex: location,
        $options: "i",
      };
    }

    if (experience) {
      filter.experience = {
        $gte: Number(experience),
      };
    }

    if (minFee || maxFee) {
      filter.consultationFee = {};

      if (minFee) filter.consultationFee.$gte = Number(minFee);

      if (maxFee) filter.consultationFee.$lte = Number(maxFee);
    }

    const lawyers = await Lawyer.find(filter)
      .populate("user", "name email")
      .populate("category", "name");

    res.json(lawyers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE LAWYER AVAILABILITY

export const updateAvailability = async (req, res) => {
  try {
    const lawyer = await Lawyer.findOne({
      user: req.user.id,
    });

    if (!lawyer) {
      return res.status(404).json({
        message: "Lawyer profile not found",
      });
    }

    lawyer.availability = req.body.availability;

    await lawyer.save();

    res.status(200).json({
      message: "Availability updated successfully",
      availability: lawyer.availability,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET LAWYER AVAILABILITY

export const getAvailability = async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id);

    if (!lawyer) {
      return res.status(404).json({
        message: "Lawyer not found",
      });
    }

    res.status(200).json({
      availability: lawyer.availability,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const approveLawyer = async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id);

    if (!lawyer) {
      return res.status(404).json({
        message: "Lawyer not found",
      });
    }

    lawyer.verificationStatus = "approved";

    await lawyer.save();

    res.status(200).json({
      message: "Lawyer approved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
