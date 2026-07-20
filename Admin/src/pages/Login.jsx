import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "admin@gmail.com",
    password: "Admin123",
  });

  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await API.post("/auth/login", formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login Successful");

      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Admin Login</h1>

          <p className="text-gray-500 mt-2">Sign in to access dashboard</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              placeholder="admin@gmail.com"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={changeHandler}
              placeholder="********"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <div className="mt-6 p-3 bg-blue-50 rounded-lg text-center">
          <p className="text-sm text-gray-600">Demo Admin Credentials</p>

          <p className="font-medium text-blue-700">admin@gmail.com</p>

          <p className="font-medium text-blue-700">Admin123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
