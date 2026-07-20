import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

// CREATE CHAT

export const createChat = async (req, res) => {
  try {
    const { receiverId, appointmentId } = req.body;

    const existing = await Chat.findOne({
      participants: {
        $all: [req.user.id, receiverId],
      },
    });

    if (existing) {
      return res.json(existing);
    }

    const chat = await Chat.create({
      participants: [req.user.id, receiverId],
      appointment: appointmentId,
    });

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET USER CHATS

export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      participants: req.user.id,
    })
      .populate("participants", "name email role")
      .sort({
        updatedAt: -1,
      });

    res.json(chats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET CHAT MESSAGES

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      chat: req.params.chatId,
    })
      .populate("sender", "name role")
      .sort({
        createdAt: 1,
      });

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
