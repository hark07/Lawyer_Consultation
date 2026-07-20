import bcrypt from "bcryptjs";

import User from "../models/User.js";
import Lawyer from "../models/Lawyer.js";
import Appointment from "../models/Appointment.js";
import Review from "../models/Review.js";

import cloudinary from "../config/cloudinary.js";

// ===============================
// CLOUDINARY UPLOAD FUNCTION
// ===============================

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "lawyers",
      },

      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      },
    );

    stream.end(fileBuffer);
  });
};

// ===============================
// ADMIN DASHBOARD
// ===============================

export const dashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({
      role: "user",
    });

    const totalLawyers = await Lawyer.countDocuments();

    const pendingLawyers = await Lawyer.countDocuments({
      verificationStatus: "pending",
    });

    res.json({
      totalUsers,

      totalLawyers,

      pendingLawyers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// GET ALL USERS
// ===============================

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// GET PENDING LAWYERS
// ===============================

export const getPendingLawyers = async (req, res) => {
  try {
    const lawyers = await Lawyer.find({
      verificationStatus: "pending",
    }).populate("user", "name email phone");

    res.json(lawyers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// APPROVE LAWYER
// ===============================

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

    res.json({
      success: true,

      message: "Lawyer approved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// REJECT LAWYER
// ===============================

export const rejectLawyer = async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id);

    if (!lawyer) {
      return res.status(404).json({
        message: "Lawyer not found",
      });
    }

    lawyer.verificationStatus = "rejected";

    await lawyer.save();

    res.json({
      success: true,

      message: "Lawyer rejected successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// ANALYTICS
// ===============================

export const analytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({
      role: "user",
    });

    const totalLawyers = await Lawyer.countDocuments();

    const approvedLawyers = await Lawyer.countDocuments({
      verificationStatus: "approved",
    });

    const pendingLawyers = await Lawyer.countDocuments({
      verificationStatus: "pending",
    });

    const rejectedLawyers = await Lawyer.countDocuments({
      verificationStatus: "rejected",
    });

    const totalAppointments = await Appointment.countDocuments();

    const completedAppointments = await Appointment.countDocuments({
      status: "completed",
    });

    const totalReviews = await Review.countDocuments();

    const averageRating = await Lawyer.aggregate([
      {
        $group: {
          _id: null,

          avgRating: {
            $avg: "$rating",
          },
        },
      },
    ]);

    res.json({
      totalUsers,

      totalLawyers,

      approvedLawyers,

      pendingLawyers,

      rejectedLawyers,

      totalAppointments,

      completedAppointments,

      totalReviews,

      averageRating: averageRating.length
        ? averageRating[0].avgRating.toFixed(1)
        : 0,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// ADD LAWYER
// ===============================

export const addLawyer = async (req, res) => {
  try {
    const {
      name,

      email,

      password,

      phone,

      category,

      specialization,

      qualification,

      experience,

      barRegistration,

      location,

      consultationFee,

      bio,
    } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,

      email,

      password: hashedPassword,

      phone,

      role: "lawyer",
    });

    let profileImage = "";

    if (req.file) {
      profileImage = await uploadToCloudinary(req.file.buffer);
    }

    const lawyer = await Lawyer.create({
      user: user._id,

      category,

      specialization: Array.isArray(specialization)
        ? specialization
        : specialization.split(",").map((i) => i.trim()),

      qualification,

      experience,

      barRegistration,

      location,

      consultationFee,

      bio,

      profileImage,

      verificationStatus: "pending",
    });

    res.status(201).json({
      message: "Lawyer added successfully",

      lawyer,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// GET ALL LAWYERS
// ===============================

export const getAllLawyers = async (req, res) => {
  try {
    const lawyers = await Lawyer.find()

      .populate("user", "name email phone")

      .populate("category", "name")

      .sort({
        createdAt: -1,
      });

    res.json(lawyers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// UPDATE LAWYER
// ===============================

// ===============================
// UPDATE LAWYER
// ===============================

export const updateLawyer = async (req, res) => {

  try {

    console.log("BODY:", req.body);

    console.log("FILE:", req.file);



    const lawyer = await Lawyer.findById(req.params.id);



    if(!lawyer){

      return res.status(404).json({
        message:"Lawyer not found"
      });

    }





    // UPDATE TEXT DATA

    lawyer.category =
      req.body.category || lawyer.category;



    if(req.body.specialization){

      try{

        lawyer.specialization =
          JSON.parse(req.body.specialization);

      }catch{

        lawyer.specialization =
          req.body.specialization
          .split(",")
          .map(i=>i.trim());

      }

    }



    lawyer.qualification =
      req.body.qualification ||
      lawyer.qualification;



    lawyer.experience =
      req.body.experience ||
      lawyer.experience;



    lawyer.barRegistration =
      req.body.barRegistration ||
      lawyer.barRegistration;



    lawyer.location =
      req.body.location ||
      lawyer.location;



    lawyer.consultationFee =
      req.body.consultationFee ||
      lawyer.consultationFee;



    lawyer.bio =
      req.body.bio ||
      lawyer.bio;





    // IMAGE UPDATE

    if(req.file){


      if(!req.file.buffer){

        return res.status(400).json({
          message:"Empty file buffer"
        });

      }



      const imageUrl =
        await uploadToCloudinary(
          req.file.buffer
        );



      lawyer.profileImage =
        imageUrl;


    }




    await lawyer.save();



    res.status(200).json({

      success:true,

      message:"Lawyer updated successfully",

      lawyer

    });



  }catch(error){


    console.log(
      "UPDATE ERROR:",
      error
    );



    res.status(500).json({

      message:error.message

    });


  }

};

// ===============================
// DELETE LAWYER
// ===============================

export const deleteLawyer = async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id);

    if (!lawyer) {
      return res.status(404).json({
        message: "Lawyer not found",
      });
    }

    await User.findByIdAndDelete(lawyer.user);

    await Lawyer.findByIdAndDelete(req.params.id);

    res.json({
      message: "Lawyer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
