import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Content Area */}
      <div className="lg:ml-64 h-screen flex flex-col">
        {/* Navbar */}
        <div className="fixed top-0 left-0 lg:left-64 right-0 h-16 z-30">
          <Navbar setOpen={setOpen} />
        </div>

        {/* Main Content */}
        <main className="mt-16 h-[calc(100vh-4rem)] overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
