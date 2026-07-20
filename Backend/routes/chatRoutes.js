import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createChat,
  getChats,
  getMessages,
} from "../controllers/chatController.js";

const router = express.Router();

router.use(protect);

router.post("/", createChat);

router.get("/", getChats);

router.get("/:chatId/messages", getMessages);

export default router;
