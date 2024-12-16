import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";

function NavBar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="sticky-top bg-warning">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div
            className="navbar-brand d-flex justify-content-center align-items-center"
            onClick={() => handleNavigation("/")}
            style={{ cursor: "pointer" }}
          >
            <img
              src="/images/BurgerIcon.png"
              alt="Brand Icon"
              width="30"
              height="24"
            />
            <h3 className="m-0 ms-2 fw-bold me-5">Burger</h3>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setClicked(!clicked)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse fw-bold ${
              clicked ? "show" : ""
            }`}
            id="navbarNav"
          >
            <ul className="navbar-nav w-100">
              <li className="nav-item me-5">
                <span
                  className="nav-link text-black"
                  onClick={() => handleNavigation("/")}
                  style={{ cursor: "pointer" }}
                >
                  Home
                </span>
              </li>
              <li className="nav-item me-5">
                <span
                  className="nav-link text-black"
                  onClick={() =>
                    handleNavigation(
                      auth.userData.role === "REGISTERED_USER"
                        ? `/profile/${auth.userData.userId}`
                        : auth.userData.role === "GUEST_USER"
                        ? `/guest-profile/${auth.userData.userId}`
                        : `/staff-profile/${auth.userData.userId}`
                    )
                  }
                  style={{ cursor: "pointer" }}
                >
                  Profile
                </span>
              </li>
              {auth.userData.role !== "ADMIN" &&
                auth.userData.role !== "COOKIE" &&
                auth.userData.role !== "WAITER" && (
                  <li className="nav-item me-5">
                    <span
                      className="nav-link text-black"
                      onClick={() => handleNavigation("/in-restaurant")}
                      style={{ cursor: "pointer" }}
                    >
                      In Restaurant
                    </span>
                  </li>
                )}
              {auth.userData.role === "REGISTERED_USER" && (
                <li className="nav-item me-5">
                  <span
                    className="nav-link text-black"
                    onClick={() => handleNavigation("/booking")}
                    style={{ cursor: "pointer" }}
                  >
                    Booking
                  </span>
                </li>
              )}
              {auth.userData.role !== "GUEST_USER" && (
                <li className="nav-item me-5">
                  <span
                    className="nav-link text-black"
                    onClick={() => handleNavigation("/menu")}
                    style={{ cursor: "pointer" }}
                  >
                    Menu
                  </span>
                </li>
              )}

              {auth.userData.role !== "GUEST_USER" &&
                auth.userData.role !== "REGISTERED_USER" && (
                  <li className="nav-item me-5">
                    <span
                      className="nav-link text-black"
                      onClick={() =>
                        handleNavigation(
                          auth.userData.role === "ADMIN"
                            ? "/admin-dashboard"
                            : auth.userData.role === "WAITER"
                            ? "/waiter-dashboard"
                            : "/cook-dashboard"
                        )
                      }
                      style={{ cursor: "pointer" }}
                    >
                      Dashboard
                    </span>
                  </li>
                )}
              <li className="nav-item ms-auto d-flex align-items-center">
                <LogoutIcon
                  className="ms-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => logout()}
                  color="error"
                />
                <span
                  className="nav-link text-black"
                  onClick={() => logout()}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
