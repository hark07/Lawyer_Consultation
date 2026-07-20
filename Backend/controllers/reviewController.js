import Review from "../models/Review.js";
import Lawyer from "../models/Lawyer.js";

// CREATE REVIEW

export const createReview = async (req, res) => {
  try {
    const {
      lawyer,

      rating,

      comment,
    } = req.body;

    const existing = await Review.findOne({
      user: req.user.id,

      lawyer,
    });

    if (existing) {
      return res.status(400).json({
        message: "Already reviewed this lawyer",
      });
    }

    const review = await Review.create({
      user: req.user.id,

      lawyer,

      rating,

      comment,
    });

    // Update lawyer rating

    const reviews = await Review.find({
      lawyer,
    });

    const total = reviews.length;

    const average = reviews.reduce((sum, item) => sum + item.rating, 0) / total;

    await Lawyer.findByIdAndUpdate(
      lawyer,

      {
        rating: average.toFixed(1),

        totalReviews: total,
      },
    );

    res.status(201).json({
      message: "Review added",

      review,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET LAWYER REVIEWS

export const getLawyerReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      lawyer: req.params.lawyerId,
    }).populate("user", "name");

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL REVIEWS (ADMIN)

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name email")
      .populate("lawyer", "name specialization")
      .sort({
        createdAt: -1,
      });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
