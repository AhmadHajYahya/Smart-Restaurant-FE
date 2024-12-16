import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "./DataContext.js";
import { api } from "./scripts/Declarations.js";

const AuthContext = createContext(null);

const TIMEOUT_DURATION = 1740000; // 29 minutes

export const AuthProvider = ({ children }) => {
  const { clearDataContext } = useData();
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    userData: JSON.parse(sessionStorage.getItem("userData")),
  });

  const logout = async () => {
    try {
      if (auth.userData?.role === "GUEST_USER") {
        await api.delete(
          `users/delete/guest?phoneNumber=${auth.userData.phoneNumber}`
        );
      } else {
        await api.put(
          `users/update/online?userId=${auth.userData.userId}&isOnline=false`,
          {}
        );
      }
      clear();
    } catch (error) {
      console.error("Error during logout:", error);
      // Handle error appropriately, e.g., show a notification or retry
    }
  };

  const clear = () => {
    sessionStorage.removeItem("authenticated");
    sessionStorage.removeItem("userData");
    clearDataContext();
    navigate("/sign-in");
    setAuth({ userData: null });
  };

  const login = (userData) => {
    setTimeout(logout, TIMEOUT_DURATION);
    sessionStorage.setItem("authenticated", true);
    sessionStorage.setItem("userData", JSON.stringify(userData));
    setAuth({ userData: userData });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
