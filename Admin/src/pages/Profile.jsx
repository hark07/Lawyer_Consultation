import { useEffect, useState } from "react";
import { FaUserShield, FaCamera, FaSave } from "react-icons/fa";
import toast from "react-hot-toast";
import API from "../api/axios";

const Profile = () => {
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  // Fetch Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/auth/profile");

        setFormData({
          name: res.data.user.name || "",
          email: res.data.user.email || "",
          phone: res.data.user.phone || "",
          role: res.data.user.role || "",
        });
      } catch (error) {
        console.log(error);

        toast.error(error.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Input Change
  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Update Profile
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await API.put("/auth/profile", {
        name: formData.name,
        phone: formData.phone,
      });

      toast.success(res.data.message);

      // Update localStorage user
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            name: formData.name,
            phone: formData.phone,
          }),
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Profile update failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 shadow-lg text-white mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Admin Profile</h1>

        <p className="mt-2 text-blue-100">
          Manage your account settings and profile information.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Cover */}
        <div className="h-40 bg-gradient-to-r from-indigo-500 to-blue-500 relative">
          <div className="absolute left-8 top-20">
            <div className="relative">
              <div className="w-36 h-36 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                <FaUserShield className="text-indigo-600" size={60} />
              </div>

              <button
                className="absolute bottom-1 right-1 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition"
                type="button"
              >
                <FaCamera />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-24 px-8 pb-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              {formData.name}
            </h2>

            <span className="inline-block mt-3 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold capitalize">
              {formData.role}
            </span>
          </div>

          <form onSubmit={submitHandler} className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={changeHandler}
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                value={formData.email}
                readOnly
                className="w-full border border-gray-300 rounded-xl p-3 bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={changeHandler}
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Account Role
              </label>

              <input
                type="text"
                value={formData.role}
                readOnly
                className="w-full border border-gray-300 rounded-xl p-3 bg-gray-100 capitalize cursor-not-allowed"
              />
            </div>

            {/* Button */}
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl flex items-center gap-2 font-semibold transition"
              >
                <FaSave />
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Extra Info Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-gray-500 text-sm">Account Status</h3>

          <p className="text-green-600 text-2xl font-bold mt-2">Active</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-gray-500 text-sm">User Role</h3>

          <p className="text-indigo-600 text-2xl font-bold mt-2 capitalize">
            {formData.role}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-gray-500 text-sm">Registered Email</h3>

          <p className="text-gray-700 font-semibold mt-2 break-all">
            {formData.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
