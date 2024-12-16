import React, { useState, useEffect } from "react";
import "./ProfileStyle.css";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Popover from "@mui/material/Popover";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { capitalizeFirstLetter } from "../../scripts/HelperFunctions";
import { api, NIS } from "../../scripts/Declarations";
import NavBar from "../NavBar/MainNavBar";
import Badge from "@mui/material/Badge";
import {
  Container,
  Grid,
  Typography,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import NotificationPopover from "../Features/NotificationPopover";

function StaffProfile() {
  const navigate = useNavigate();
  const { auth, logout } = useAuth();
  const { name } = auth.userData;
  const [guestsLoad, setGuestsLoad] = useState(["Low"]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    password: "",
  });
  const [formValid, setFormValid] = useState(false);
  const [popOverAnchorEl, setPopOverAnchorEl] = useState(null);
  const openPopOver = Boolean(popOverAnchorEl);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAlertClick = (event) => {
    setPopOverAnchorEl(event.currentTarget);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleCloseModal = () => {
    setFormValid(false);
    setShowModal(false);
  };

  const handleShowModal = () => {
    setAnchorEl(null);
    setShowModal(true);
    setFormData({ email: "", phoneNumber: "", password: "" });
  };

  const handleShowUserId = () => {
    setSnackbarOpen(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validateForm({ ...formData, [name]: value });
  };

  const validateForm = (data) => {
    const isValid =
      (data.email !== "" && data.email !== undefined) ||
      (data.name !== "" && data.name !== undefined) ||
      (data.phoneNumber !== "" && data.phoneNumber !== undefined) ||
      (data.password !== "" && data.password !== undefined);
    setFormValid(isValid);
  };

  const handleSaveChanges = () => {
    const body = {
      userId: auth.userData.userId,
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      email: formData.email,
    };

    api
      .put(`/users/registered/update`, body)
      .then(() => {
        alert("Details Updated Successfully\nPlease Login Again");
        handleCloseModal();
        logout();
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  useEffect(() => {
    api.get("/tables/guests-load").then((response) => {
      setGuestsLoad([response.data.data.load, response.data.data.timeToVisit]);
    });
    const eventSource = new EventSource(
      `${process.env.REACT_APP_BASE_URL}/real-time/update/guests-load`,
      {
        withCredentials: true,
      }
    );

    eventSource.onmessage = function (event) {
      const data = JSON.parse(event.data);
      setGuestsLoad([data.data.load, data.data.timeToVisit]);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleDashboardclick = () => {
    const role = auth.userData.role;
    if (role === "ADMIN") {
      navigate("/admin-dashboard");
    } else if (role === "COOK") {
      navigate("/cook-dashboard");
    } else if (role === "WAITER") {
      navigate("/waiter-dashboard");
    }
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="lg" className="mt-3">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper
              className="user-data-card shadow position-relative rounded-4"
              elevation={3}
            >
              <div className="pt-5">
                <div className="w-100 d-flex justify-content-center align-items-center">
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <PersonIcon className="person-icon border" />
                    <h3 className="mt-3">{name}</h3>
                    <p className="mt-2">
                      {capitalizeFirstLetter(auth.userData.role)}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="mx-5 mt-2 border rounded-5">
                    <div className="m-2 ms-3">
                      <p className="m-0 mb-1" style={{ fontSize: "12px" }}>
                        Email
                      </p>
                      <h6>{auth.userData.email}</h6>
                    </div>
                  </div>
                  <div className="mx-5 mt-2 border rounded-5">
                    <div className="m-2 ms-3">
                      <p className="m-0 mb-1" style={{ fontSize: "12px" }}>
                        Phone Number
                      </p>
                      <h6>{auth.userData.phoneNumber}</h6>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{ bottom: "1px", left: "50%" }}
                className="position-absolute translate-middle"
              >
                <SettingsIcon
                  style={{ cursor: "pointer" }}
                  id="settings-button"
                  aria-controls={open ? "settings-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={(event) => setAnchorEl(event.currentTarget)}
                />

                <Menu
                  id="settings-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                  MenuListProps={{
                    "aria-labelledby": "settings-button",
                  }}
                >
                  <MenuItem onClick={handleShowModal}>
                    Edit Your Details
                  </MenuItem>
                  <MenuItem onClick={handleShowUserId}>Show User ID</MenuItem>
                </Menu>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <div
              className="rounded-4 shadow py-3"
              style={{ backgroundColor: "#ffcece" }}
            >
              <div className="ms-4 h-100 d-flex flex-column justify-content-around align-items-start">
                <h5>Guests Load : {guestsLoad.at(0)}</h5>
                <h5>{guestsLoad.at(1)}</h5>
              </div>
            </div>

            <div
              className="container  p-5 rounded-4 mt-3 shadow"
              style={{ backgroundColor: "#ffe599" }}
            >
              <div className="col">
                <div className="my-card " onClick={handleDashboardclick}>
                  Dashboard
                </div>
              </div>
              <div className="col">
                <div className="my-card " onClick={() => navigate("/menu")}>
                  Menu
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>

      {/* Edit User Details Modal */}
      <Dialog
        open={showModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Your Details</DialogTitle>
        <DialogContent style={{ backgroundColor: "#f5f5f5" }}>
          <DialogContentText>
            Please enter the field you want to update.
          </DialogContentText>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Close
          </Button>
          <Button
            onClick={handleSaveChanges}
            color="primary"
            disabled={!formValid}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for User ID */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity="info"
          sx={{ width: "100%" }}
        >
          User ID: {auth.userData.userId}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default StaffProfile;
