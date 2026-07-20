import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import socket from "../socket";
import toast from "react-hot-toast";
import { FaPaperPlane } from "react-icons/fa";

const LawyerChats = () => {
  // =========================
  // USER
  // =========================

  const user = JSON.parse(localStorage.getItem("user"));

  // =========================
  // STATES
  // =========================

  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  const bottomRef = useRef(null);

  // =========================
  // LOAD CHATS
  // =========================

  useEffect(() => {
    fetchChats();
  }, []);

  // =========================
  // SOCKET
  // =========================

  useEffect(() => {
    if (!user?._id) return;

    socket.emit("join", user._id);

    const handleNewMessage = (message) => {
      if (message.chat === selectedChat?._id) {
        setMessages((prev) => {
          const exists = prev.find((msg) => msg._id === message._id);

          if (exists) return prev;

          return [...prev, message];
        });
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [selectedChat]);

  // =========================
  // AUTO SCROLL
  // =========================

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // =========================
  // FETCH CHATS
  // =========================

  const fetchChats = async () => {
    try {
      const { data } = await API.get("/chats");

      setChats(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load chats");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // OPEN CHAT
  // =========================

  const openChat = async (chat) => {
    try {
      setSelectedChat(chat);

      const { data } = await API.get(`/chats/${chat._id}/messages`);

      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load messages");
    }
  };

  // =========================
  // SEND MESSAGE
  // =========================

  const sendMessage = async () => {
    if (!text.trim() || !selectedChat) return;

    try {
      const { data } = await API.post("/messages", {
        chatId: selectedChat._id,
        text,
      });

      const receiver = selectedChat.participants.find(
        (p) => p._id !== user._id,
      );

      socket.emit("sendMessage", {
        message: data,
        receiverId: receiver?._id,
      });

      setMessages((prev) => [...prev, data]);

      setText("");
    } catch (error) {
      console.log(error);
      toast.error("Message send failed");
    }
  };

  // =========================
  // RETURN
  // =========================

  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-70px)] bg-gray-100">
        <div className="max-w-7xl mx-auto h-full">
          <div className="grid md:grid-cols-3 h-full bg-white shadow-lg overflow-hidden">
            {/* =========================
                LEFT CHAT LIST
            ========================= */}

            <div className="border-r flex flex-col h-full">
              {/* Header */}

              <div className="bg-[#075E54] text-white p-4 shrink-0">
                <h2 className="text-xl font-bold">Client Chats</h2>
              </div>

              {/* Chat List */}

              <div className="flex-1 overflow-y-auto">
                {loading ? (
                  <div className="p-5 text-gray-500">Loading...</div>
                ) : chats.length === 0 ? (
                  <div className="p-5 text-gray-500">No Chats Available</div>
                ) : (
                  chats.map((chat) => {
                    const otherUser = chat.participants?.find(
                      (p) => p._id !== user?._id,
                    );

                    return (
                      <div
                        key={chat._id}
                        onClick={() => openChat(chat)}
                        className={`flex items-center gap-3 p-4 border-b cursor-pointer transition hover:bg-gray-100 ${
                          selectedChat?._id === chat._id ? "bg-gray-100" : ""
                        }`}
                      >
                        {/* Avatar */}

                        <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg">
                          {otherUser?.name?.charAt(0)}
                        </div>

                        {/* User Info */}

                        <div className="flex-1 overflow-hidden">
                          <h3 className="font-semibold truncate">
                            {otherUser?.name}
                          </h3>

                          <p className="text-sm text-gray-500 truncate">
                            {chat.lastMessage || "Start Conversation"}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* =========================
                RIGHT CHAT WINDOW
            ========================= */}

            <div className="md:col-span-2 flex flex-col h-full overflow-hidden">
              {!selectedChat ? (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-700">
                      Legal Consultation Chat
                    </h2>

                    <p className="text-gray-500 mt-3">
                      Select a client to start chatting
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* =========================
                      CHAT HEADER
                  ========================= */}

                  <div className="bg-[#075E54] text-white p-4 flex items-center gap-3 shrink-0">
                    <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center font-bold">
                      {selectedChat.participants
                        .find((p) => p._id !== user._id)
                        ?.name?.charAt(0)}
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg">
                        {
                          selectedChat.participants.find(
                            (p) => p._id !== user._id,
                          )?.name
                        }
                      </h3>

                      <p className="text-sm text-green-200">Online</p>
                    </div>
                  </div>
                  {/* =========================
                      CHAT MESSAGES
                  ========================= */}

                  <div
                    className="flex-1 overflow-y-auto p-5"
                    style={{
                      backgroundColor: "#efeae2",
                    }}
                  >
                    <div className="space-y-3">
                      {messages.length === 0 ? (
                        <div className="flex justify-center items-center h-full text-gray-500">
                          No messages yet
                        </div>
                      ) : (
                        messages.map((msg) => {
                          // Detect sender (supports populated and non-populated sender)
                          const senderId =
                            msg.sender?._id ||
                            msg.sender?.id ||
                            msg.senderId ||
                            msg.userId ||
                            msg.sender;

                          const isMine = String(senderId) === String(user?._id);

                          return (
                            <div
                              key={msg._id}
                              className={`flex w-full ${
                                isMine ? "justify-end" : "justify-start"
                              }`}
                            >
                              <div
                                className={`max-w-[75%] sm:max-w-[65%] px-4 py-2 shadow rounded-2xl break-words ${
                                  isMine
                                    ? "bg-[#DCF8C6] rounded-br-md"
                                    : "bg-white rounded-bl-md"
                                }`}
                              >
                                <p className="text-gray-800 whitespace-pre-wrap break-words">
                                  {msg.text}
                                </p>

                                <div
                                  className={`mt-1 flex items-center gap-1 text-[11px] text-gray-500 ${
                                    isMine ? "justify-end" : "justify-start"
                                  }`}
                                >
                                  <span>
                                    {new Date(msg.createdAt).toLocaleTimeString(
                                      [],
                                      {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      },
                                    )}
                                  </span>

                                  {isMine && (
                                    <span className="text-blue-500 font-bold">
                                      ✓✓
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}

                      <div ref={bottomRef} />
                    </div>
                  </div>
                  {/* =========================
                      MESSAGE INPUT
                  ========================= */}

                  <div className="bg-gray-100 border-t p-4 shrink-0">
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            sendMessage();
                          }
                        }}
                        placeholder="Type a message..."
                        className="
                          flex-1
                          border
                          rounded-full
                          px-5
                          py-3
                          outline-none
                          bg-white
                          focus:ring-2
                          focus:ring-green-500
                        "
                      />

                      <button
                        onClick={sendMessage}
                        className="
                          w-12
                          h-12
                          rounded-full
                          bg-[#075E54]
                          hover:bg-[#0b806f]
                          text-white
                          flex
                          items-center
                          justify-center
                          transition
                        "
                      >
                        <FaPaperPlane />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LawyerChats;
