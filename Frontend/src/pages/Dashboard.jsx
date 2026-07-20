import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [appointmentsRes, notificationsRes] = await Promise.all([
        API.get("/appointments/my"),
        API.get("/notifications"),
      ]);

      setAppointments(
        appointmentsRes.data.appointments || appointmentsRes.data || [],
      );

      setNotifications(
        notificationsRes.data.notifications || notificationsRes.data || [],
      );
    } catch (error) {
      console.error(error);

      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const upcomingAppointments = appointments.filter(
    (item) => item.status !== "completed" && item.status !== "cancelled",
  );

  const unreadNotifications = notifications.filter((item) => !item.isRead);

  const totalSpent = appointments.reduce(
    (sum, item) => sum + (item.consultationFee || 0),
    0,
  );

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="flex justify-center items-center h-[70vh]">
          <h2 className="text-2xl font-semibold">Loading Dashboard...</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

          {/* Stats */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500">Total Appointments</h3>

              <p className="text-3xl font-bold mt-2">{appointments.length}</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500">Upcoming</h3>

              <p className="text-3xl font-bold mt-2 text-blue-600">
                {upcomingAppointments.length}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500">Notifications</h3>

              <p className="text-3xl font-bold mt-2 text-red-500">
                {unreadNotifications.length}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500">Total Spent</h3>

              <p className="text-3xl font-bold mt-2 text-green-600">
                Rs. {totalSpent}
              </p>
            </div>
          </div>

          {/* Upcoming Appointments */}

          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>

            {upcomingAppointments.length === 0 ? (
              <p className="text-gray-500">No upcoming appointments.</p>
            ) : (
              <div className="space-y-4">
                {upcomingAppointments.slice(0, 5).map((appointment) => (
                  <div key={appointment._id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">
                          {appointment.lawyer?.user?.name ||
                            appointment.lawyer?.specialization ||
                            "Lawyer"}
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(appointment.date).toLocaleDateString()}
                        </p>

                        <p className="text-sm text-gray-500">
                          {appointment.time}
                        </p>
                      </div>

                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Recent Notifications</h2>

            {notifications.length === 0 ? (
              <p className="text-gray-500">No notifications found.</p>
            ) : (
              <div className="space-y-4">
                {notifications.slice(0, 5).map((notification) => (
                  <div
                    key={notification._id}
                    className={`border rounded-lg p-4 ${
                      !notification.isRead ? "bg-blue-50" : ""
                    }`}
                  >
                    <p className="font-medium">{notification.title}</p>

                    <p className="text-gray-600 mt-1">{notification.message}</p>

                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
