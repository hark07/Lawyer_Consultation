import Lawyer from "../models/Lawyer.js";
import Earning from "../models/Earning.js";

export const getLawyerEarnings = async (req, res) => {
  try {
    const lawyer = await Lawyer.findOne({
      user: req.user.id,
    });

    if (!lawyer) {
      return res.status(404).json({
        message: "Lawyer profile not found",
      });
    }

    const earnings = await Earning.find({
      lawyer: lawyer._id,
    }).populate("appointment");

    const totalEarnings = earnings.reduce((sum, item) => sum + item.amount, 0);

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyEarnings = earnings
      .filter((item) => {
        const date = new Date(item.createdAt);

        return (
          date.getMonth() === currentMonth && date.getFullYear() === currentYear
        );
      })
      .reduce((sum, item) => sum + item.amount, 0);

    res.status(200).json({
      totalEarnings,
      monthlyEarnings,
      totalConsultations: earnings.length,
      earnings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
