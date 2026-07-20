import Message from "../models/Message.js";
import Chat from "../models/Chat.js";
import Notification from "../models/Notification.js";

export const sendMessage = async (req, res) => {
  try {
    const { chatId, text } = req.body;

    const message = await Message.create({
      chat: chatId,
      sender: req.user.id,
      text,
    });

    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: text,
    });

    const chat = await Chat.findById(chatId);

    const receiver = chat.participants.find(
      (p) => p.toString() !== req.user.id,
    );

    await Notification.create({
      receiver,
      title: "New Message",
      message: text,
      type: "message",
    });

    const populated = await Message.findById(message._id)
      .populate("sender", "name role")
      .populate({
        path: "chat",
        populate: {
          path: "participants",
        },
      });

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
