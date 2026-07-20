import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import toast from "react-hot-toast";

const Appointments = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meetingLoading, setMeetingLoading] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data } = await API.get("/appointments/user");

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

  const openChat = async (appointment) => {
    try {
      const lawyerUserId =
        appointment?.lawyer?.user?._id || appointment?.lawyer?.user;

      if (!lawyerUserId) {
        return toast.error("Lawyer account not found");
      }

      const { data } = await API.post("/chats", {
        receiverId: lawyerUserId,
        appointmentId: appointment._id,
      });

      navigate(`/chat/${data._id}`);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to open chat");
    }
  };

  const joinMeeting = async (appointmentId) => {
    try {
      setMeetingLoading(appointmentId);

      await API.post("/meetings/create", {
        appointmentId,
      });

      navigate(`/video/${appointmentId}`);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to create meeting");
    } finally {
      setMeetingLoading(null);
    }
  };

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

      case "cancelled":
        return "bg-gray-100 text-gray-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center">
          Loading appointments...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">My Appointments</h1>

          {appointments.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-8 text-center">
              No appointments found
            </div>
          ) : (
            <div className="space-y-5">
              {appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold mb-2">
                        {appointment?.lawyer?.user?.name || "Lawyer"}
                      </h2>

                      <p className="text-gray-600">
                        Date:{" "}
                        {appointment?.date
                          ? new Date(appointment.date).toLocaleDateString()
                          : "N/A"}
                      </p>

                      <p className="text-gray-600">
                        Time: {appointment?.time || "N/A"}
                      </p>

                      <p className="text-gray-600">
                        Type: {appointment?.consultationType || "N/A"}
                      </p>

                      <p className="text-green-600 font-semibold">
                        Fee: Rs. {appointment?.consultationFee || 0}
                      </p>

                      {appointment?.message && (
                        <div className="mt-3">
                          <p className="font-semibold">Legal Issue:</p>

                          <p className="text-gray-700">{appointment.message}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-between items-start md:items-end gap-4">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColor(
                          appointment.status,
                        )}`}
                      >
                        {appointment.status}
                      </span>

                      {(appointment.status === "accepted" ||
                        appointment.status === "completed") && (
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => joinMeeting(appointment._id)}
                            disabled={meetingLoading === appointment._id}
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg disabled:opacity-50"
                          >
                            {meetingLoading === appointment._id
                              ? "Creating..."
                              : "Join Meeting"}
                          </button>

                          <button
                            onClick={() => openChat(appointment)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                          >
                            Open Chat
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Appointments;
