import express from "express";

import {
  getProfile,
  updateProfile,
  deleteProfile,
  changePassword,
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";


const router = express.Router();

// Profile CRUD

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

router.delete("/profile", protect, deleteProfile);

router.put("/change-password", protect, changePassword);

export default router;
