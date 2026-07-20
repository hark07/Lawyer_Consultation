import {
  FaUsers,
  FaTimes,
  FaCalendarCheck,
  FaStar,
  FaRegFolderOpen,
  FaBell,
  FaUser,
} from "react-icons/fa";
import { GiJusticeStar } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Sidebar = ({ open, setOpen }) => {
  const menuItems = [
    {
      name: "Dashboard",
      icon: <MdDashboard />,
      path: "/admin/dashboard",
    },
    {
      name: "Add Lawyer",
      icon: <FaUsers />,
      path: "/admin/add-lawyer",
    },
    {
      name: "Users",
      icon: <FaUsers />,
      path: "/admin/users",
    },
    {
      name: "Lawyers",
      icon: <GiJusticeStar />,
      path: "/admin/lawyers",
    },
    {
      name: "Lawyers Management",
      icon: <GiJusticeStar />,
      path: "/admin/lawyer-management",
    },
    {
      name: "Appointments",
      icon: <FaCalendarCheck />,
      path: "/admin/appointments",
    },
    // {
    //   name: "Reviews",
    //   icon: <FaStar />,
    //   path: "/admin/reviews",
    // },
    {
      name: "Categories",
      icon: <FaRegFolderOpen />,
      path: "/admin/categories",
    },
    // {
    //   name: "Notifications",
    //   icon: <FaBell />,
    //   path: "/admin/notifications",
    // },
    {
      name: "Profile",
      icon: <FaUser />,
      path: "/admin/profile",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0
          h-screen w-64
          bg-slate-900 text-white
          z-50
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-700 flex-shrink-0">
          <h2 className="text-xl font-bold">Admin Panel</h2>

          <button onClick={() => setOpen(false)} className="lg:hidden">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Scrollable Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
