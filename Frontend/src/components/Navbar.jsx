import { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import NotificationBadge from "./NotificationBadge";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    setOpen(false);
  };

  const navClass = ({ isActive }) =>
    `
    transition
    ${
      isActive
        ? "text-yellow-300 font-semibold"
        : "text-white hover:text-gray-200"
    }
    `;

  return (
    <nav className="bg-blue-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}

          <Link to="/" className="text-2xl font-bold text-white">
            Legal Consult
          </Link>

          {/* Desktop */}

          <div className="hidden md:flex items-center gap-6">
            {/* COMMON */}

            <NavLink to="/" className={navClass}>
              Home
            </NavLink>

            {/* USER LOGGED OUT */}

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
                  className="
                  bg-white
                  text-blue-700
                  px-4 py-2
                  rounded-lg
                  "
                >
                  Register
                </NavLink>
              </>
            )}

            {/* USER LOGIN */}

            {user?.role === "user" && (
              <>
                <NavLink to="/lawyers" className={navClass}>
                  Lawyers
                </NavLink>

                <NavLink to="/appointments" className={navClass}>
                  Appointments
                </NavLink>

                <NavLink to="/notifications" className={navClass}>
                  <span className="flex gap-2 items-center">
                    Notifications
                    <NotificationBadge />
                  </span>
                </NavLink>

                <NavLink to="/dashboard" className={navClass}>
                  Dashboard
                </NavLink>
              </>
            )}

            {/* LAWYER LOGIN */}

            {user?.role === "lawyer" && (
              <>
                <NavLink to="/notifications" className={navClass}>
                  <span className="flex gap-2 items-center">
                    Notifications
                    <NotificationBadge />
                  </span>
                </NavLink>

                <NavLink to="/lawyer/dashboard" className={navClass}>
                  Lawyer Panel
                </NavLink>
              </>
            )}

            {/* PROFILE + LOGOUT */}

            {user && (
              <>
                <NavLink
                  to="/profile"
                  className="
                    flex
                    items-center
                    gap-2
                    text-white
                    hover:text-gray-200
                    "
                >
                  <FaUserCircle />

                  {user.name}
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-4 py-2
                    rounded-lg
                    "
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Button */}

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white"
          >
            {open ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}

        {open && (
          <div
            className="
              md:hidden
              flex
              flex-col
              gap-4
              py-5
              border-t
              border-blue-500
              "
          >
            <NavLink to="/" onClick={() => setOpen(false)} className={navClass}>
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

                <NavLink to="/register" className="text-white">
                  Register
                </NavLink>
              </>
            )}

            {user?.role === "user" && (
              <>
                <NavLink to="/lawyers" className={navClass}>
                  Lawyers
                </NavLink>

                <NavLink to="/appointments" className={navClass}>
                  Appointments
                </NavLink>

                <NavLink to="/notifications" className={navClass}>
                  Notifications
                </NavLink>

                <NavLink to="/dashboard" className={navClass}>
                  Dashboard
                </NavLink>
              </>
            )}

            {user?.role === "lawyer" && (
              <>
                <NavLink to="/notifications" className={navClass}>
                  Notifications
                </NavLink>

                <NavLink to="/lawyer/dashboard" className={navClass}>
                  Lawyer Panel
                </NavLink>
              </>
            )}

            {user && (
              <>
                <NavLink
                  to="/profile"
                  className="text-white flex gap-2 items-center"
                >
                  <FaUserCircle />

                  {user.name}
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="
                      bg-red-500
                      text-white
                      py-2
                      rounded-lg
                      "
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
