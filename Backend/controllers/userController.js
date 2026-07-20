import User from "../models/User.js";
import Lawyer from "../models/Lawyer.js";
import bcrypt from "bcryptjs";

// ================= GET PROFILE =================

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    let lawyer = null;

    if (user.role === "lawyer") {
      lawyer = await Lawyer.findOne({
        user: user._id,
      }).populate("category");
    }

    res.status(200).json({
      success: true,
      user,
      lawyer,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= UPDATE PROFILE =================

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { name, phone } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,

      {
        name,
        phone,
      },

      {
        new: true,
        runValidators: true,
      },
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    let lawyer = null;

    if (user.role === "lawyer") {
      lawyer = await Lawyer.findOneAndUpdate(
        {
          user: userId,
        },

        {
          ...req.body,
        },

        {
          new: true,
          runValidators: true,
        },
      );
    }

    res.json({
      success: true,
      message: "Profile Updated Successfully",
      user,
      lawyer,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= DELETE PROFILE =================

export const deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // delete lawyer profile also

    if (user.role === "lawyer") {
      await Lawyer.findOneAndDelete({
        user: userId,
      });
    }

    await User.findByIdAndDelete(userId);

    res.json({
      success: true,
      message: "Account Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= CHANGE PASSWORD =================

export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;

    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Old password incorrect",
      });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({
      success: true,
      message: "Password Changed Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
