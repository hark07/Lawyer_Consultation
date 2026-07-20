import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Lawyers from "../pages/Lawyers";
import LawyerDetails from "../pages/LawyerDetails";
import Appointments from "../pages/Appointments";
import Chat from "../pages/Chat";
import Notifications from "../pages/Notifications";
import Dashboard from "../pages/Dashboard";
import LawyerDashboard from "../pages/LawyerDashboard";
import VideoConsultation from "../pages/VideoConsultation";
import LawyerChats from "../pages/LawyerChats";
import Profile from "../pages/Profile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/lawyers" element={<Lawyers />} />

      <Route path="/lawyer/chats" element={<LawyerChats />} />

      <Route path="/lawyers/:id" element={<LawyerDetails />} />

      <Route path="/appointments" element={<Appointments />} />

      <Route path="/chat/:chatId" element={<Chat />} />

      <Route path="/notifications" element={<Notifications />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/lawyer/dashboard" element={<LawyerDashboard />} />

      <Route path="/video/:appointmentId" element={<VideoConsultation />} />

      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;
