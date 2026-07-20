import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import {
  FaArrowLeft,
  FaStar,
  FaEdit,
  FaSave,
  FaTimes,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaMoneyBillWave,
  FaShieldAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({});

  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/profile");

      setData(res.data);

      setForm({
        name: res.data.user?.name || "",
        phone: res.data.user?.phone || "",
        specialization: res.data.lawyer?.specialization?.join(", ") || "",
        qualification: res.data.lawyer?.qualification || "",
        experience: res.data.lawyer?.experience || "",
        barRegistration: res.data.lawyer?.barRegistration || "",
        location: res.data.lawyer?.location || "",
        consultationFee: res.data.lawyer?.consultationFee || "",
        bio: res.data.lawyer?.bio || "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async () => {
    try {
      setLoading(true);

      await API.put("/users/profile", form);

      toast.success("Profile updated successfully");

      setEdit(false);

      fetchProfile();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="bg-white px-8 py-6 rounded-2xl shadow-lg">
          <p className="text-gray-500 font-medium">Loading Profile...</p>
        </div>
      </div>
    );
  }

  const { user, lawyer } = data;

  const avatar =
    user?.name
      ?.split(" ")
      ?.map((n) => n[0])
      ?.join("")
      ?.slice(0, 2)
      ?.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-slate-100 py-6 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6"
        >
          <FaArrowLeft />
          Back
        </button>

        {/* Main Card */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">
          {/* Header */}

          <div className="h-52 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 relative">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          {/* Profile Section */}

          <div className="px-6 md:px-10 pb-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between -mt-20 relative z-10">
              <div className="flex flex-col lg:flex-row items-center lg:items-end gap-5">
                <div className="w-40 h-40 rounded-full bg-white p-2 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-5xl font-bold">
                    {avatar}
                  </div>
                </div>

                <div className="text-center lg:text-left">
                  <h1 className="text-3xl font-bold text-slate-800">
                    {form.name}
                  </h1>

                  <p className="text-slate-500 mt-1">{user?.email}</p>

                  <span className="inline-block mt-3 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-medium capitalize">
                    {user?.role}
                  </span>
                </div>
              </div>

              {!edit ? (
                <button
                  onClick={() => setEdit(true)}
                  className="mt-6 lg:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <FaEdit />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-3 mt-6 lg:mt-0">
                  <button
                    onClick={updateProfile}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
                  >
                    <FaSave />
                    {loading ? "Saving..." : "Save"}
                  </button>

                  <button
                    onClick={() => setEdit(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
                  >
                    <FaTimes />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Information Grid */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">
              <InputCard
                icon={<FaEnvelope />}
                title="Email"
                value={user?.email}
                readOnly
              />

              <InputCard
                icon={<FaPhone />}
                title="Phone"
                name="phone"
                value={form.phone}
                edit={edit}
                onChange={handleChange}
              />

              {lawyer && (
                <>
                  <InputCard
                    icon={<FaBriefcase />}
                    title="Specialization"
                    name="specialization"
                    value={form.specialization}
                    edit={edit}
                    onChange={handleChange}
                  />

                  <InputCard
                    icon={<FaGraduationCap />}
                    title="Qualification"
                    name="qualification"
                    value={form.qualification}
                    edit={edit}
                    onChange={handleChange}
                  />

                  <InputCard
                    icon={<FaBriefcase />}
                    title="Experience"
                    name="experience"
                    value={form.experience}
                    edit={edit}
                    onChange={handleChange}
                  />

                  <InputCard
                    icon={<FaShieldAlt />}
                    title="Bar Registration"
                    name="barRegistration"
                    value={form.barRegistration}
                    edit={edit}
                    onChange={handleChange}
                  />

                  <InputCard
                    icon={<FaMapMarkerAlt />}
                    title="Location"
                    name="location"
                    value={form.location}
                    edit={edit}
                    onChange={handleChange}
                  />

                  <InputCard
                    icon={<FaMoneyBillWave />}
                    title="Consultation Fee"
                    name="consultationFee"
                    value={form.consultationFee}
                    edit={edit}
                    onChange={handleChange}
                  />

                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center gap-2 text-yellow-500 mb-2">
                      <FaStar />
                      <span className="font-semibold">Rating</span>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-800">
                      {lawyer?.rating || 0}
                    </h2>

                    <p className="text-slate-500">
                      {lawyer?.totalReviews || 0} Reviews
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Bio */}

            {lawyer && (
              <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-3">
                  About Lawyer
                </h3>

                {edit ? (
                  <textarea
                    rows="5"
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                ) : (
                  <p className="text-slate-600 leading-relaxed">
                    {form.bio || "No bio available."}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InputCard = ({
  icon,
  title,
  name,
  value,
  edit,
  onChange,
  readOnly = false,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-2 text-blue-600 mb-2">
        {icon}
        <span className="font-semibold">{title}</span>
      </div>

      {edit && !readOnly ? (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border border-slate-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <p className="text-slate-700 font-medium break-words">
          {value || "Not Added"}
        </p>
      )}
    </div>
  );
};

export default Profile;
