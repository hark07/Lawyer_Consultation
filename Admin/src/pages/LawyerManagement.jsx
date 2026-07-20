import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

const LawyerManagement = () => {
  const navigate = useNavigate();

  const [lawyers, setLawyers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLawyers();
  }, []);

  // GET ALL LAWYERS

  const fetchLawyers = async () => {
    try {
      const { data } = await API.get("/admin/lawyers");

      setLawyers(data);
    } catch (error) {
      toast.error("Failed to load lawyers");
    } finally {
      setLoading(false);
    }
  };

  // DELETE LAWYER

  const deleteLawyer = async (id) => {
    const confirmDelete = window.confirm("Delete this lawyer?");

    if (!confirmDelete) return;

    try {
      await API.delete(`/admin/lawyers/${id}`);

      setLawyers((prev) => prev.filter((lawyer) => lawyer._id !== id));

      toast.success("Lawyer deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  // SEARCH

  const filteredLawyers = lawyers.filter(
    (lawyer) =>
      lawyer.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      lawyer.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
      lawyer.specialization
        ?.join(", ")
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-3xl font-bold">Lawyer Management</h1>

        <input
          type="text"
          placeholder="Search lawyer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
          border rounded-lg
          px-4 py-3
          w-full md:w-80
          "
        />
      </div>

      {/* Desktop Table */}

      <div
        className="
      hidden md:block
      bg-white
      rounded-xl
      shadow
      overflow-hidden
      "
      >
        <table className="w-full">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Email</th>

              <th className="p-4 text-left">Category</th>

              <th className="p-4 text-left">Specialization</th>

              <th className="p-4 text-left">Experience</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLawyers.map((lawyer) => (
              <tr key={lawyer._id} className="border-b">
                <td className="p-4">{lawyer.user?.name}</td>

                <td className="p-4">{lawyer.user?.email}</td>

                <td className="p-4">{lawyer.category?.name || "N/A"}</td>

                <td className="p-4">{lawyer.specialization?.join(", ")}</td>

                <td className="p-4">{lawyer.experience} Years</td>

                <td className="p-4">
                  <span
                    className={`
                  px-3 py-1 rounded-full text-sm

                  ${
                    lawyer.verificationStatus === "approved"
                      ? "bg-green-100 text-green-700"
                      : lawyer.verificationStatus === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }
                  `}
                  >
                    {lawyer.verificationStatus}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() =>
                        navigate(`/admin/lawyers/edit/${lawyer._id}`)
                      }
                      className="
                    bg-blue-600
                    text-white
                    px-4 py-2
                    rounded-lg
                    "
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteLawyer(lawyer._id)}
                      className="
                    bg-red-600
                    text-white
                    px-4 py-2
                    rounded-lg
                    "
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}

      <div
        className="
      grid
      gap-4
      md:hidden
      "
      >
        {filteredLawyers.map((lawyer) => (
          <div
            key={lawyer._id}
            className="
          bg-white
          rounded-xl
          shadow
          p-5
          "
          >
            <h2 className="text-xl font-bold">{lawyer.user?.name}</h2>

            <p>{lawyer.user?.email}</p>

            <p className="mt-2">
              Category:
              {lawyer.category?.name}
            </p>

            <p>
              Specialization:
              {lawyer.specialization?.join(", ")}
            </p>

            <p>
              Experience:
              {lawyer.experience} Years
            </p>

            <span
              className="
          inline-block
          mt-2
          bg-slate-100
          px-3 py-1
          rounded-full
          "
            >
              {lawyer.verificationStatus}
            </span>

            <div
              className="
          flex gap-2 mt-4
          "
            >
              <button
                onClick={() => navigate(`/admin/lawyers/edit/${lawyer._id}`)}
                className="
          flex-1
          bg-blue-600
          text-white
          py-2
          rounded-lg
          "
              >
                Edit
              </button>

              <button
                onClick={() => deleteLawyer(lawyer._id)}
                className="
          flex-1
          bg-red-600
          text-white
          py-2
          rounded-lg
          "
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LawyerManagement;
