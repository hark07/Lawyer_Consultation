import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Login from "../pages/Login";

import ProtectedRoute from "./ProtectedRoute";
import Lawyers from "../pages/Lawyers";
import Appointments from "../pages/Appointments";
import Reviews from "../pages/Reviews";
import Categories from "../pages/Categories";
import Notifications from "../pages/Notifications";
import Profile from "../pages/Profile";
import LawyerManagement from "../pages/LawyerManagement";
import AddLawyer from "../pages/AddLawyer";
import EditLawyer from "../pages/EditLawyer";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/lawyers" element={<Lawyers />} />
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

        <Route path="/admin/dashboard" element={<Dashboard />} />

        <Route path="/admin/add-lawyer" element={<AddLawyer />} />

        <Route path="/admin/lawyer-management" element={<LawyerManagement />} />
        <Route path="/admin/lawyers/edit/:id" element={<EditLawyer />} />

        <Route path="/admin/users" element={<Users />} />

        <Route path="/admin/appointments" element={<Appointments />} />

        <Route path="/admin/reviews" element={<Reviews />} />

        <Route path="/admin/categories" element={<Categories />} />

        <Route path="/admin/notifications" element={<Notifications />} />

        <Route path="/admin/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
