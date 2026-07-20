import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/admin/users");
      setUsers(data);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return <div className="text-center py-10">Loading Users...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold">Users Management</h1>

        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 bg-white"
        />
      </div>

      {/* Desktop Table */}

      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Email</th>

              <th className="p-4 text-left">Role</th>

              <th className="p-4 text-left">Phone</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="p-4">{user.name}</td>

                <td className="p-4">{user.email}</td>

                <td className="p-4 capitalize">{user.role}</td>

                <td className="p-4">{user.phone || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}

      <div className="grid md:hidden gap-4">
        {filteredUsers.map((user) => (
          <div key={user._id} className="bg-white rounded-xl shadow-sm p-4">
            <h2 className="font-bold text-lg">{user.name}</h2>

            <p className="text-gray-600">{user.email}</p>

            <p className="mt-2">
              Role:
              <span className="font-medium ml-2 capitalize">{user.role}</span>
            </p>

            <p>
              Phone:
              <span className="font-medium ml-2">{user.phone || "N/A"}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
