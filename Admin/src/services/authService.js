import API from "../api/axios";

export const loginAdmin = async (credentials) => {
  const { data } = await API.post("/auth/login", {
    ...credentials,
    role: "admin",
  });

  return data;
};

export const getAdminProfile = async () => {
  const { data } = await API.get("/admin/profile");
  return data;
};

export const logoutAdmin = async () => {
  const { data } = await API.post("/auth/logout");
  return data;
};
