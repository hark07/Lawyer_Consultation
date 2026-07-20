import { FaBars, FaBell } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = ({ setOpen }) => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-white border-b border-gray-200 px-4 md:px-6 flex items-center justify-between">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setOpen(true)}
        >
          <FaBars size={20} />
        </button>

        <div>
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>

          <p className="text-xs text-gray-500 hidden sm:block">
            Manage users, lawyers and platform activities
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <FaBell className="text-gray-600" size={18} />

          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* User Info */}
        <div className="hidden md:flex items-center gap-3">
          <div className="text-right">
            <p className="font-semibold text-gray-800">
              {user?.name || "Admin"}
            </p>

            <p className="text-xs text-gray-500 capitalize">
              {user?.role || "admin"}
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow">
            {user?.name?.charAt(0)?.toUpperCase() || "A"}
          </div>
        </div>

        {/* Mobile Avatar */}
        <div className="md:hidden w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          {user?.name?.charAt(0)?.toUpperCase() || "A"}
        </div>

        {/* Logout */}
        <button
          onClick={logoutHandler}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all"
        >
          <FiLogOut size={18} />
          <span className="hidden md:block">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
