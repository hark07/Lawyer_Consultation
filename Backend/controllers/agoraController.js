import { buildAgoraToken } from "../utils/agoraToken.js";

export const generateToken = async (req, res) => {
  try {
    const { channelName } = req.body;

    if (!channelName) {
      return res.status(400).json({
        message: "Channel name required",
      });
    }

    const token = buildAgoraToken(channelName);

    res.json({
      success: true,
      appId: process.env.AGORA_APP_ID,
      token,
      channelName,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
