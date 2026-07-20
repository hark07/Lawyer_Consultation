import "dotenv/config";
import dns from "dns";

dns.setServers([
  "8.8.8.8",
  "8.8.4.4",
]);

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import http from "http";

import connectDB from "./config/db.js";

import "./config/cloudinary.js";

// Routes

import authRoutes from "./routes/authRoutes.js";
import lawyerRoutes from "./routes/lawyerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import consultationRoutes from "./routes/consultationRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import meetingRoutes from "./routes/meetingRoutes.js";
import agoraRoutes from "./routes/agoraRoutes.js";
import legalCategoryRoutes from "./routes/legalCategoryRoutes.js";
import earningRoutes from "./routes/earningRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import { initSocket } from "./socket/socketServer.js";

// ============================
// APP
// ============================

const app = express();

// ============================
// DATABASE
// ============================

connectDB();

// ============================
// CLOUDINARY
// ============================

// ============================
// HTTP SERVER
// ============================

const server = http.createServer(app);

// ============================
// SOCKET.IO
// ============================

initSocket(server);

// ============================
// SECURITY
// ============================

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

app.use(compression());

app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// ============================
// CORS
// ============================

const allowedOrigins = [
  "http://localhost:5173",

  "http://localhost:5174",

  // production frontend
  // "https://your-domain.com"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS blocked"));
    },

    credentials: true,
  }),
);

// ============================
// BODY PARSER
// ============================

app.use(
  express.json({
    limit: "10mb",
  }),
);

app.use(
  express.urlencoded({
    extended: true,

    limit: "10mb",
  }),
);

app.use(cookieParser());

// ============================
// STATIC FILE
// ============================

app.use("/uploads", express.static("uploads"));

// ============================
// HEALTH CHECK
// ============================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,

    message: "Legal Consultation API Running",

    status: "OK",
  });
});

// ============================
// ROOT
// ============================

app.get("/", (req, res) => {
  res.json({
    success: true,

    message: "Backend Running 🚀",
  });
});

// ============================
// API ROUTES
// ============================

app.use("/api/auth", authRoutes);

app.use("/api/lawyers", lawyerRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/appointments", appointmentRoutes);

app.use("/api/consultations", consultationRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/reviews", reviewRoutes);

app.use("/api/chats", chatRoutes);

app.use("/api/messages", messageRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/meetings", meetingRoutes);

app.use("/api/agora", agoraRoutes);

app.use("/api/legal-categories", legalCategoryRoutes);

app.use("/api/earnings", earningRoutes);

app.use("/api/users", userRoutes);

// ============================
// ERROR HANDLING
// ============================

app.use(notFound);

app.use(errorHandler);

// ============================
// START SERVER
// ============================

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);

  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});

// ============================
// SHUTDOWN
// ============================

process.on("SIGINT", () => {
  console.log("Server shutting down...");

  server.close(() => {
    process.exit(0);
  });
});
