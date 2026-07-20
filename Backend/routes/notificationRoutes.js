import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  deleteNotification,
  getNotifications,
  markAsRead,
  unreadCount,
} from "../controllers/notificationController.js";

const router = express.Router();

router.use(protect);

router.get("/", getNotifications);

router.get("/unread-count", unreadCount);

router.put("/:id/read", markAsRead);

router.delete("/:id", deleteNotification);

export default router;
