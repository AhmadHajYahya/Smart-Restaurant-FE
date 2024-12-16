import React, { useEffect } from "react";
import { useAuth } from "./AuthContext.js";

const AppInitializer = () => {
  const { logout } = useAuth();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      logout();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Set the background color when the component mounts
    document.body.style.backgroundColor = "#FFEBC5"; // Change to any color you like

    // Optionally reset the background color when the component unmounts
    return () => {
      document.body.style.backgroundColor = "initial";
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [logout]);

  return null;
};

export default AppInitializer;
