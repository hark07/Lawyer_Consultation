import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../api/axios";

const Lawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLawyers();
  }, []);

  const fetchLawyers = async () => {
    try {
      const { data } = await API.get("/admin/lawyers/pending");

      setLawyers(data);
    } catch (error) {
      toast.error("Failed to load lawyers");
    } finally {
      setLoading(false);
    }
  };

  const approveLawyer = async (id) => {
    try {
      await API.put(`/admin/lawyers/${id}/approve`);

      toast.success("Lawyer Approved");

      setLawyers((prev) => prev.filter((lawyer) => lawyer._id !== id));
    } catch (error) {
      toast.error("Approval failed");
    }
  };

  const rejectLawyer = async (id) => {
    try {
      await API.put(`/admin/lawyers/${id}/reject`);

      toast.success("Lawyer Rejected");

      setLawyers((prev) => prev.filter((lawyer) => lawyer._id !== id));
    } catch (error) {
      toast.error("Rejection failed");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Pending Lawyers</h1>

      {/* Desktop Table */}

      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Email</th>

              <th className="p-4 text-left">Phone</th>

              <th className="p-4 text-left">Specialization</th>

              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {lawyers.map((lawyer) => (
              <tr key={lawyer._id} className="border-b">
                <td className="p-4">{lawyer.user?.name}</td>

                <td className="p-4">{lawyer.user?.email}</td>

                <td className="p-4">{lawyer.user?.phone}</td>

                <td className="p-4">{lawyer.specialization}</td>

                <td className="p-4">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => approveLawyer(lawyer._id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => rejectLawyer(lawyer._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}

      <div className="grid gap-4 md:hidden">
        {lawyers.map((lawyer) => (
          <div key={lawyer._id} className="bg-white rounded-xl shadow-sm p-4">
            <h2 className="font-bold text-lg">{lawyer.user?.name}</h2>

            <p>{lawyer.user?.email}</p>

            <p>{lawyer.user?.phone}</p>

            <p className="mt-2">{lawyer.specialization}</p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => approveLawyer(lawyer._id)}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg"
              >
                Approve
              </button>

              <button
                onClick={() => rejectLawyer(lawyer._id)}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lawyers;
