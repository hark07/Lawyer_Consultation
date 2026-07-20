import { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaBalanceScale,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import NotificationBadge from "./NotificationBadge";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `transition duration-200 ${
      isActive
        ? "text-yellow-300 font-semibold"
        : "text-white hover:text-gray-200"
    }`;

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-2 text-white text-2xl font-bold"
          >
            <FaBalanceScale />
            Legal Consult
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="https://lawyer-consultationadmin.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 text-black px-3 py-2 rounded-lg font-medium hover:bg-yellow-300 transition"
            >
              Admin
            </a>

            <NavLink to="/" className={navClass}>
              Home
            </NavLink>

            {!user && (
              <>
                <NavLink to="/lawyers" className={navClass}>
                  Lawyers
                </NavLink>

                <NavLink to="/login" className={navClass}>
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="bg-white text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
                >
                  Register
                </NavLink>
              </>
            )}

            {/* USER */}
            {user?.role === "user" && (
              <>
                <NavLink to="/lawyers" className={navClass}>
                  Lawyers
                </NavLink>

                <NavLink to="/appointments" className={navClass}>
                  Appointments
                </NavLink>

                <NavLink to="/notifications" className={navClass}>
                  <div className="flex items-center gap-2">
                    Notifications
                    <NotificationBadge />
                  </div>
                </NavLink>

                <NavLink to="/dashboard" className={navClass}>
                  Dashboard
                </NavLink>
              </>
            )}

            {/* LAWYER */}
            {user?.role === "lawyer" && (
              <>
                <NavLink to="/notifications" className={navClass}>
                  <div className="flex items-center gap-2">
                    Notifications
                    <NotificationBadge />
                  </div>
                </NavLink>

                <NavLink to="/lawyer/dashboard" className={navClass}>
                  Lawyer Panel
                </NavLink>
              </>
            )}

            {/* PROFILE */}
            {user && (
              <>
                <NavLink
                  to="/profile"
                  className="flex items-center gap-2 text-white hover:text-gray-200"
                >
                  <FaUserCircle size={22} />
                  <span>{user.name}</span>
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white"
          >
            {open ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden flex flex-col gap-4 py-5 border-t border-blue-500">
            <NavLink
              to="/"
              className={navClass}
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>

            <a
              href="https://lawyer-consultationadmin.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              Admin
            </a>

            {!user && (
              <>
                <NavLink
                  to="/lawyers"
                  className={navClass}
                  onClick={() => setOpen(false)}
                >
                  Lawyers
                </NavLink>

                <NavLink
                  to="/login"
                  className={navClass}
                  onClick={() => setOpen(false)}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="text-white"
                  onClick={() => setOpen(false)}
                >
                  Register
                </NavLink>
              </>
            )}

            {user?.role === "user" && (
              <>
                <NavLink
                  to="/lawyers"
                  className={navClass}
                  onClick={() => setOpen(false)}
                >
                  Lawyers
                </NavLink>

                <NavLink
                  to="/appointments"
                  className={navClass}
                  onClick={() => setOpen(false)}
                >
                  Appointments
                </NavLink>

                <NavLink
                  to="/notifications"
                  className={navClass}
                  onClick={() => setOpen(false)}
                >
                  Notifications
                </NavLink>

                <NavLink
                  to="/dashboard"
                  className={navClass}
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </NavLink>
              </>
            )}

            {user?.role === "lawyer" && (
              <>
                <NavLink
                  to="/notifications"
                  className={navClass}
                  onClick={() => setOpen(false)}
                >
                  Notifications
                </NavLink>

                <NavLink
                  to="/lawyer/dashboard"
                  className={navClass}
                  onClick={() => setOpen(false)}
                >
                  Lawyer Panel
                </NavLink>
              </>
            )}

            {user && (
              <>
                <NavLink
                  to="/profile"
                  className="flex items-center gap-2 text-white"
                  onClick={() => setOpen(false)}
                >
                  <FaUserCircle />
                  {user.name}
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;