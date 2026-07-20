import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/appointments");

      setAppointments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = appointments.filter((item) =>
    item.user?.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const statusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "accepted":
        return "bg-blue-100 text-blue-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const paymentColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold">Loading Appointments...</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-3xl font-bold">Appointment Management</h1>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />

          <button
            onClick={fetchAppointments}
            className="bg-blue-600 text-white px-4 rounded-lg"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Empty State */}

      {filteredAppointments.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center shadow">
          <h2 className="text-xl font-semibold">No Appointments Found</h2>
        </div>
      ) : (
        <>
          {/* Desktop */}

          <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-4 text-left">Client</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Lawyer</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Time</th>
                  <th className="p-4 text-left">Type</th>
                  <th className="p-4 text-left">Fee</th>
                  <th className="p-4 text-left">Payment</th>
                  <th className="p-4 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredAppointments.map((item) => (
                  <tr key={item._id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{item.user?.name}</td>

                    <td className="p-4">{item.user?.email}</td>

                    <td className="p-4">
                      {item.lawyer?.user?.name ||
                        item.lawyer?.specialization ||
                        "N/A"}
                    </td>

                    <td className="p-4">
                      {new Date(item.date).toLocaleDateString()}
                    </td>

                    <td className="p-4">{item.time}</td>

                    <td className="p-4 capitalize">{item.consultationType}</td>

                    <td className="p-4">Rs. {item.consultationFee}</td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${paymentColor(
                          item.paymentStatus,
                        )}`}
                      >
                        {item.paymentStatus}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${statusColor(
                          item.status,
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}

          <div className="grid gap-4 md:hidden">
            {filteredAppointments.map((item) => (
              <div key={item._id} className="bg-white rounded-xl shadow p-4">
                <h2 className="font-bold text-lg">{item.user?.name}</h2>

                <p className="text-gray-500">{item.user?.email}</p>

                <p className="mt-2">
                  Lawyer:{" "}
                  {item.lawyer?.user?.name || item.lawyer?.specialization}
                </p>

                <p>Date: {new Date(item.date).toLocaleDateString()}</p>

                <p>Time: {item.time}</p>

                <p>Type: {item.consultationType}</p>

                <p>Fee: Rs. {item.consultationFee}</p>

                <div className="flex gap-2 mt-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${statusColor(
                      item.status,
                    )}`}
                  >
                    {item.status}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${paymentColor(
                      item.paymentStatus,
                    )}`}
                  >
                    {item.paymentStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Appointments;
