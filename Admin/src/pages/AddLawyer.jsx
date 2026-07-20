import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

const AddLawyer = () => {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",

    category: "",

    specialization: "",

    qualification: "",

    experience: "",

    barRegistration: "",

    location: "",

    consultationFee: "",

    bio: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  // =========================
  // GET CATEGORIES
  // =========================

  const fetchCategories = async () => {
    try {
      const { data } = await API.get("/legal-categories");

      setCategories(data.categories || []);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  // =========================
  // INPUT CHANGE
  // =========================

  const changeHandler = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // IMAGE SELECT
  // =========================

  const imageHandler = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select image file");

      return;
    }

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  // =========================
  // SUBMIT
  // =========================

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // specialization

      data.set(
        "specialization",

        JSON.stringify(
          formData.specialization.split(",").map((item) => item.trim()),
        ),
      );

      // IMAGE

      if (image) {
        data.append("profileImage", image);
      }

      // DEBUG

      console.log("Selected File:", image);

      for (const item of data.entries()) {
        console.log(item[0], item[1]);
      }

      await API.post(
        "/admin/lawyers",

        data,
      );

      toast.success("Lawyer Added Successfully");

      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",

        category: "",

        specialization: "",

        qualification: "",

        experience: "",

        barRegistration: "",

        location: "",

        consultationFee: "",

        bio: "",
      });

      setImage(null);

      setPreview("");
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to add lawyer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-6">Add Lawyer</h1>

        <form onSubmit={submitHandler} className="grid md:grid-cols-2 gap-5">
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={changeHandler}
            className="border p-3 rounded"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={changeHandler}
            className="border p-3 rounded"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={changeHandler}
            className="border p-3 rounded"
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={changeHandler}
            className="border p-3 rounded"
          />

          <select
            name="category"
            value={formData.category}
            onChange={changeHandler}
            className="border p-3 rounded"
            required
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            name="specialization"
            placeholder="Civil Law, Property Law"
            value={formData.specialization}
            onChange={changeHandler}
            className="border p-3 rounded"
          />

          <input
            name="qualification"
            placeholder="Qualification"
            value={formData.qualification}
            onChange={changeHandler}
            className="border p-3 rounded"
          />

          <input
            type="number"
            name="experience"
            placeholder="Experience"
            value={formData.experience}
            onChange={changeHandler}
            className="border p-3 rounded"
          />

          <input
            name="barRegistration"
            placeholder="Bar Registration"
            value={formData.barRegistration}
            onChange={changeHandler}
            className="border p-3 rounded"
          />

          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={changeHandler}
            className="border p-3 rounded"
          />

          <input
            type="number"
            name="consultationFee"
            placeholder="Consultation Fee"
            value={formData.consultationFee}
            onChange={changeHandler}
            className="border p-3 rounded"
          />

          <div>
            <label className="block mb-2 font-medium">Profile Image</label>

            <input type="file" accept="image/*" onChange={imageHandler} />

            {preview && (
              <img
                src={preview}
                className="mt-3 w-32 h-32 rounded-full object-cover"
              />
            )}
          </div>

          <textarea
            name="bio"
            rows="4"
            placeholder="Bio"
            value={formData.bio}
            onChange={changeHandler}
            className="border p-3 rounded md:col-span-2"
          />

          <button
            disabled={loading}
            className="md:col-span-2 bg-blue-600 text-white py-3 rounded-lg"
          >
            {loading ? "Adding..." : "Add Lawyer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLawyer;
