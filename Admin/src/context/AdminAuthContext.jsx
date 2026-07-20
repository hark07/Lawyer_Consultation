import { createContext, useContext, useEffect, useState } from "react";

import { getAdminProfile } from "../services/authService";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      setLoading(false);
      return;
    }

    getAdminProfile()
      .then((res) => {
        setAdmin(res.admin);
      })
      .catch(() => {
        localStorage.removeItem("adminToken");
      })
      .finally(() => setLoading(false));
  }, []);

  const login = ({ token, admin }) => {
    localStorage.setItem("adminToken", token);

    setAdmin(admin);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");

    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
