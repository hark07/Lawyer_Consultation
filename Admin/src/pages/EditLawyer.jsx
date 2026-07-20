import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

const EditLawyer = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
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

    fetchLawyer();
  }, []);

  // =========================
  // FETCH CATEGORY
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
  // FETCH LAWYER
  // =========================

  const fetchLawyer = async () => {
    try {
      const { data } = await API.get(`/lawyers/${id}`);

      setFormData({
        category: data.category?._id || "",

        specialization: Array.isArray(data.specialization)
          ? data.specialization.join(", ")
          : data.specialization || "",

        qualification: data.qualification || "",

        experience: data.experience || "",

        barRegistration: data.barRegistration || "",

        location: data.location || "",

        consultationFee: data.consultationFee || "",

        bio: data.bio || "",
      });

      // Cloudinary image

      setPreview(data.profileImage || "");
    } catch (error) {
      toast.error("Failed to load lawyer");
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
  // IMAGE CHANGE
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

    console.log("Selected Image:", file);

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  // =========================
  // UPDATE LAWYER
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
          formData.specialization

            .split(",")

            .map((item) => item.trim()),
        ),
      );

      // IMAGE

      if (image) {
        data.append("profileImage", image);
      }

      // DEBUG

      console.log("FORM DATA");

      for (const pair of data.entries()) {
        console.log(pair[0], pair[1]);
      }

      await API.put(
        `/admin/lawyers/${id}`,

        data,
      );

      toast.success("Lawyer Updated Successfully");

      navigate("/admin/lawyer-management");
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div
        className="
        bg-white
        shadow-xl
        rounded-2xl
        p-6
      "
      >
        <h1
          className="
          text-3xl
          font-bold
          mb-6
        "
        >
          Edit Lawyer
        </h1>

        <form
          onSubmit={submitHandler}
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          "
        >
          <div>
            <label className="font-medium">Category</label>

            <select
              name="category"
              value={formData.category}
              onChange={changeHandler}
              className="
                w-full
                border
                rounded-lg
                p-3
                mt-2
              "
            >
              <option value="">Select Category</option>

              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Specialization"
            name="specialization"
            value={formData.specialization}
            onChange={changeHandler}
          />

          <Input
            label="Qualification"
            name="qualification"
            value={formData.qualification}
            onChange={changeHandler}
          />

          <Input
            label="Experience"
            name="experience"
            type="number"
            value={formData.experience}
            onChange={changeHandler}
          />

          <Input
            label="Bar Registration"
            name="barRegistration"
            value={formData.barRegistration}
            onChange={changeHandler}
          />

          <Input
            label="Location"
            name="location"
            value={formData.location}
            onChange={changeHandler}
          />

          <Input
            label="Consultation Fee"
            name="consultationFee"
            type="number"
            value={formData.consultationFee}
            onChange={changeHandler}
          />

          <div>
            <label className="font-medium">Profile Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={imageHandler}
              className="
                mt-2
              "
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="
                  mt-3
                  w-32
                  h-32
                  rounded-full
                  object-cover
                  border
                "
              />
            )}
          </div>

          <div className="md:col-span-2">
            <label className="font-medium">Bio</label>

            <textarea
              name="bio"
              rows="5"
              value={formData.bio}
              onChange={changeHandler}
              className="
                w-full
                border
                rounded-lg
                p-3
                mt-2
              "
            />
          </div>

          <button
            disabled={loading}
            className="
              md:col-span-2
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-3
              rounded-lg
              font-semibold
            "
          >
            {loading ? "Updating..." : "Update Lawyer"}
          </button>
        </form>
      </div>
    </div>
  );
};

// Reusable Input

const Input = ({ label, name, value, onChange, type = "text" }) => {
  return (
    <div>
      <label className="font-medium">{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="
w-full
border
rounded-lg
p-3
mt-2
"
      />
    </div>
  );
};

export default EditLawyer;
