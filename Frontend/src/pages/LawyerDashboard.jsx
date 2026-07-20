import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import toast from "react-hot-toast";

const LawyerDashboard = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const { data } = await API.get("/appointments/lawyer");

      setAppointments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to load appointments",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/appointments/${id}/status`, {
        status,
      });

      toast.success(`Appointment ${status}`);

      fetchAppointments();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to update appointment",
      );
    }
  };

  const totalAppointments = appointments.length;

  const completedAppointments = appointments.filter(
    (item) => item.status === "completed",
  ).length;

  const pendingAppointments = appointments.filter(
    (item) => item.status === "pending",
  ).length;

  const acceptedAppointments = appointments.filter(
    (item) => item.status === "accepted",
  ).length;

  const earnings = appointments
    .filter((item) => item.status === "completed")
    .reduce((total, item) => total + (item.consultationFee || 0), 0);

  const statusColor = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      case "completed":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto p-4">
          {/* Header */}

          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold">Lawyer Dashboard</h1>

            <button
              onClick={() => navigate("/lawyer/chats")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              Open Chats
            </button>
          </div>

          {/* Stats */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-gray-500">Total Appointments</h3>

              <p className="text-3xl font-bold mt-2">{totalAppointments}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-gray-500">Pending</h3>

              <p className="text-3xl font-bold text-yellow-600 mt-2">
                {pendingAppointments}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-gray-500">Accepted</h3>

              <p className="text-3xl font-bold text-green-600 mt-2">
                {acceptedAppointments}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-gray-500">Earnings</h3>

              <p className="text-3xl font-bold text-blue-600 mt-2">
                Rs. {earnings}
              </p>
            </div>
          </div>

          {/* Appointment List */}

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-6">Appointment Requests</h2>

            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : appointments.length === 0 ? (
              <div className="text-center py-8">No appointments found</div>
            ) : (
              <div className="space-y-5">
                {appointments.map((appointment) => (
                  <div key={appointment._id} className="border rounded-xl p-5">
                    <div className="flex flex-col lg:flex-row justify-between gap-5">
                      <div>
                        <h3 className="text-lg font-bold">
                          {appointment.user?.name || "Client"}
                        </h3>

                        <p className="text-gray-600 mt-1">
                          {appointment.user?.email}
                        </p>

                        <p className="text-gray-600">
                          {appointment.user?.phone}
                        </p>

                        <p className="mt-3">
                          <strong>Date:</strong>{" "}
                          {appointment.date
                            ? new Date(appointment.date).toLocaleDateString()
                            : "N/A"}
                        </p>

                        <p>
                          <strong>Time:</strong> {appointment.time || "N/A"}
                        </p>

                        <p>
                          <strong>Consultation:</strong>{" "}
                          {appointment.consultationType}
                        </p>

                        <p>
                          <strong>Fee:</strong> Rs.{" "}
                          {appointment.consultationFee}
                        </p>

                        {appointment.message && (
                          <p className="mt-3 text-gray-700">
                            <strong>Message:</strong> {appointment.message}
                          </p>
                        )}

                        <span
                          className={`inline-block mt-3 px-4 py-2 rounded-full text-sm font-medium ${statusColor(
                            appointment.status,
                          )}`}
                        >
                          {appointment.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 h-fit">
                        {appointment.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                updateStatus(appointment._id, "accepted")
                              }
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                            >
                              Accept
                            </button>

                            <button
                              onClick={() =>
                                updateStatus(appointment._id, "rejected")
                              }
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {appointment.status === "accepted" && (
                          <>
                            <button
                              onClick={() => navigate("/lawyer/chats")}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                            >
                              Chat
                            </button>

                            <button
                              onClick={() =>
                                updateStatus(appointment._id, "completed")
                              }
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                            >
                              Complete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
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

export default LawyerDashboard;
