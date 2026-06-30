import {
  useState,
  useEffect,
} from "react";
import { authAPI } from "../utils/api";
import { AuthContext } from "./authContextValue";

/* ====================================== */
/* PROVIDER */
/* ====================================== */

export const AuthProvider = ({ children }) => {
  /* USER STATE */
  const [user, setUser] = useState(null);

  /* LOADING STATE */
  const [loading, setLoading] = useState(true);

  /* ====================================== */
  /* LOAD USER FROM LOCAL STORAGE & VERIFY */
  /* ====================================== */

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("kuviyamToken");
      if (token) {
        try {
          const response = await authAPI.getMe();
          setUser(response.data.user);
        } catch {
          localStorage.removeItem("kuviyamToken");
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  /* ====================================== */
  /* REGISTER USER */
  /* ====================================== */

  const register = async (userData) => {
    const response = await authAPI.register(userData);
    const { user, token } = response.data;
    localStorage.setItem("kuviyamToken", token);
    setUser(user);
    return response.data;
  };

  /* ====================================== */
  /* LOGIN USER */
  /* ====================================== */

  const login = async (loginData) => {
    const response = await authAPI.login(loginData);
    const { user, token } = response.data;
    localStorage.setItem("kuviyamToken", token);
    setUser(user);
    return response.data;
  };

  /* ====================================== */
  /* LOGOUT */
  /* ====================================== */

  const logout = () => {
    localStorage.removeItem("kuviyamToken");
    setUser(null);
  };

  /* ====================================== */
  /* UPDATE PROFILE */
  /* ====================================== */

  const updateProfile = async (updatedData) => {
    const response = await authAPI.updateProfile(updatedData);
    setUser(response.data.user);
    return response.data;
  };

  /* ====================================== */
  /* CONTEXT VALUE */
  /* ====================================== */

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  /* ====================================== */
  /* PROVIDER */
  /* ====================================== */

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
