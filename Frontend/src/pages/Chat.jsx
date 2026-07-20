import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import socket from "../socket";
import toast from "react-hot-toast";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";

const Chat = () => {
  // ===========================
  // ROUTE
  // ===========================

  const { chatId } = useParams();
  const navigate = useNavigate();

  // ===========================
  // USER
  // ===========================

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // ===========================
  // STATES
  // ===========================

  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const bottomRef = useRef(null);

  // ===========================
  // HELPERS
  // ===========================

  const formatTime = (time) => {
    if (!time) return "";

    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSenderId = (msg) => {
    return (
      msg.sender?._id ||
      msg.sender?.id ||
      msg.senderId ||
      msg.userId ||
      msg.sender
    );
  };

  const isOwnMessage = (msg) => {
    return String(getSenderId(msg)) === String(user?._id);
  };

  // ===========================
  // FETCH CHAT
  // ===========================

  const fetchChat = useCallback(async () => {
    try {
      const { data } = await API.get("/chats");

      const selected = data.find((item) => String(item._id) === String(chatId));

      if (selected) {
        setChat(selected);
      }
    } catch (err) {
      console.error(err);
      toast.error("Unable to load chat");
    }
  }, [chatId]);

  // ===========================
  // FETCH MESSAGES
  // ===========================

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await API.get(`/chats/${chatId}/messages`);

      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        setMessages([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Unable to load messages");
    } finally {
      setLoading(false);
    }
  }, [chatId]);

  // ===========================
  // INITIAL LOAD
  // ===========================

  useEffect(() => {
    if (!chatId) return;

    fetchChat();
    fetchMessages();
  }, [chatId, fetchChat, fetchMessages]);

  // ===========================
  // AUTO SCROLL
  // ===========================

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // ===========================
  // OTHER USER
  // ===========================

  const otherUser = chat?.participants?.find(
    (item) => String(item._id) !== String(user?._id),
  );
  // ===========================
  // SOCKET CONNECTION
  // ===========================

  useEffect(() => {
    if (!user?._id || !chatId) return;

    // Join personal room
    socket.emit("join", user._id);

    // Join current chat room (if your backend supports it)
    socket.emit("joinChat", chatId);

    const handleNewMessage = (message) => {
      if (!message) return;

      const incomingChatId =
        message.chat?._id || message.chatId || message.chat;

      if (String(incomingChatId) !== String(chatId)) return;

      setMessages((prev) => {
        const exists = prev.some((m) => String(m._id) === String(message._id));

        if (exists) return prev;

        return [...prev, message];
      });
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);

      // Leave chat room (optional)
      socket.emit("leaveChat", chatId);
    };
  }, [chatId, user?._id]);

  // ===========================
  // SEND MESSAGE
  // ===========================

  const sendMessage = async () => {
    const messageText = text.trim();

    if (!messageText || sending) return;

    try {
      setSending(true);

      const { data } = await API.post("/messages", {
        chatId,
        text: messageText,
      });

      // Receiver
      const receiver = chat?.participants?.find(
        (p) => String(p._id) !== String(user?._id),
      );

      // Emit socket event
      socket.emit("sendMessage", {
        message: data,
        receiverId: receiver?._id,
      });

      // Prevent duplicates
      setMessages((prev) => {
        const exists = prev.some((m) => String(m._id) === String(data._id));

        if (exists) return prev;

        return [...prev, data];
      });

      setText("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  // ===========================
  // ENTER TO SEND
  // ===========================

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ===========================
  // START JSX
  // ===========================

  return (
    <>
      <Navbar />

      <div className="h-[calc(100vh-70px)] bg-[#efeae2]">
        <div className="max-w-5xl mx-auto h-full">
          <div className="flex flex-col h-full bg-white shadow-lg overflow-hidden rounded-lg">
            {/* ===========================
                HEADER
            =========================== */}

            <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3 shadow">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-full hover:bg-white/20 transition"
              >
                <FaArrowLeft size={18} />
              </button>

              <div className="w-11 h-11 rounded-full bg-green-600 flex items-center justify-center text-lg font-bold uppercase">
                {otherUser?.name?.charAt(0) || "U"}
              </div>

              <div className="flex-1 overflow-hidden">
                <h2 className="font-semibold truncate">
                  {otherUser?.name || "Chat"}
                </h2>

                <p className="text-xs text-green-200">Online</p>
              </div>
            </div>

            {/* ===========================
                MESSAGE AREA
            =========================== */}

            <div className="flex-1 overflow-y-auto px-4 py-5">
              {loading ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Loading messages...
                </div>
              ) : messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No messages yet. Start the conversation 👋
                </div>
              ) : (
                <>
                  {messages.map((msg) => {
                    const mine = isOwnMessage(msg);

                    return (
                      <div
                        key={msg._id}
                        className={`flex mb-3 ${
                          mine ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`
                            max-w-[80%]
                            sm:max-w-[70%]
                            px-4
                            py-2
                            rounded-2xl
                            shadow
                            break-words
                            ${
                              mine
                                ? "bg-[#DCF8C6] rounded-br-md"
                                : "bg-white rounded-bl-md"
                            }
                          `}
                        >
                          {/* Message */}

                          <p className="text-[15px] text-gray-800 whitespace-pre-wrap break-words">
                            {msg.text}
                          </p>

                          {/* Time */}

                          <div
                            className={`flex items-center gap-1 mt-1 text-[11px] text-gray-500 ${
                              mine ? "justify-end" : "justify-start"
                            }`}
                          >
                            <span>{formatTime(msg.createdAt)}</span>

                            {mine && (
                              <span className="text-blue-500 font-bold">
                                ✓✓
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Auto Scroll */}

                  <div ref={bottomRef} />
                </>
              )}
            </div>

            {/* ===========================
                FOOTER
            =========================== */}

            <div className="border-t bg-white px-4 py-3">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  autoComplete="off"
                  className="
                    flex-1
                    rounded-full
                    border
                    border-gray-300
                    px-5
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-green-500
                    focus:border-green-500
                  "
                />

                <button
                  onClick={sendMessage}
                  disabled={sending || !text.trim()}
                  className={`
                    w-12
                    h-12
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-white
                    transition
                    ${
                      sending || !text.trim()
                        ? "bg-green-300 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }
                  `}
                >
                  {sending ? (
                    <span className="animate-pulse text-sm">...</span>
                  ) : (
                    <FaPaperPlane />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
