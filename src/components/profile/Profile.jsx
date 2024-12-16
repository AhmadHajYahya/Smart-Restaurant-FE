import React, { useState, useEffect } from "react";

import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableFooter from "@mui/material/TableFooter";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import NavBar from "../NavBar/MainNavBar";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Modal from "react-bootstrap/Modal";
import { api, NIS } from "../../scripts/Declarations";
import NotificationPopover from "../Features/NotificationPopover";

function Profile() {
  const navigate = useNavigate();
  const { auth, logout } = useAuth();
  const { name, ordersCount, bookingsCount } = auth.userData;
  const [guestsLoad, setGuestsLoad] = useState(["Low"]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    password: "",
  });
  const [formValid, setFormValid] = useState(false);
  const [userOrdersHistory, setUserOrdersHistory] = useState([]);
  const [bookingTime, setBookingTime] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAlertClick = (event) => {
    setAnchorEl(event.currentTarget);
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

  const handleShowModal2 = () => {
    setShowModal2(true);
    setAnchorEl(null);

    api
      .get(`/mealOrders/user-orders-history?userId=${auth.userData.userId}`)
      .then((response) => {
        setUserOrdersHistory(response.data.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
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
    // Check if any field is non-empty and then update form validity
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

  useEffect(() => {
    api
      .get(`/bookings/booking-time?userId=${auth.userData.userId}`)
      .then((response) => {
        setBookingTime(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.REACT_APP_BASE_URL}/notifications/stream`,
      {
        withCredentials: true,
      }
    );

    eventSource.onmessage = function (event) {
      const data = JSON.parse(event.data); // Parse the JSON data
      setAlerts((alerts) => [...alerts, data]);
    };
    eventSource.onerror = function (error) {
      console.error("EventSource failed: ", error);
      eventSource.close();
    };
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <NavBar />
      <Container maxWidth="lg" className="mt-4">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper
              className="user-data-card shadow position-relative rounded-4"
              elevation={3}
            >
              <NotificationPopover alerts={alerts} />
              <div className="pt-5 ">
                <div className="w-100 d-flex justify-content-center align-items-center">
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <PersonIcon className="person-icon border" />
                    <h3 className="mt-3"> {name}</h3>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="mx-5 mt-2 border rounded-5">
                    <div className="m-2 ms-3">
                      <p className="m-0 mb-1" style={{ fontSize: "12px" }}>
                        Email
                      </p>
                      <h6>{auth.userData.email}</h6>
                    </div>
                  </div>
                  <div className="mx-5  mt-2 border rounded-5">
                    <div className="m-2 ms-3">
                      <p className="m-0 mb-1" style={{ fontSize: "12px" }}>
                        Phone Number
                      </p>
                      <h6>{auth.userData.phoneNumber}</h6>
                    </div>
                  </div>
                </div>
                {bookingTime && (
                  <div className="mx-5 mt-5">
                    <div className="m-2 ms-3">
                      <h6 style={{ color: "green" }}>
                        You have booking today at : {bookingTime}
                      </h6>
                    </div>
                  </div>
                )}
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
                  <MenuItem onClick={handleShowModal2}>
                    Show Orders History
                  </MenuItem>
                  <MenuItem onClick={handleShowUserId}>Show User ID</MenuItem>
                </Menu>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className="mb-3 d-flex justify-content-center align-items-center">
              <div className="statistics shadow me-2">
                <div className="ms-4 h-100 d-flex flex-column justify-content-around align-items-start ">
                  <h5>{ordersCount}</h5>
                  <h5>Orders</h5>
                </div>
              </div>
              <div className="statistics shadow">
                <div className="ms-4 h-100 d-flex flex-column justify-content-around align-items-start">
                  <h5>{bookingsCount}</h5>
                  <h5>Bookings</h5>
                </div>
              </div>
            </div>
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
              className="container p-5 rounded-4 mt-3 shadow"
              style={{ backgroundColor: "#ffe599" }}
            >
              <div className="col">
                <div
                  className="my-card "
                  onClick={() => navigate("/in-restaurant")}
                >
                  In Restaurant
                </div>
              </div>
              <div className="col">
                <div className="my-card " onClick={() => navigate("/menu")}>
                  Menu
                </div>
              </div>
              <div className="col">
                <div className="my-card " onClick={() => navigate("/booking")}>
                  Booking
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

      {/* Show Orders History Modal */}
      <Modal
        show={showModal2}
        fullscreen={true}
        onHide={() => setShowModal2(false)}
      >
        <Modal.Header style={{ backgroundColor: "#8be4f9" }} closeButton>
          <Modal.Title>Orders History</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#caf3ff" }}>
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              {userOrdersHistory.map((mealOrder, index) => (
                <Grid item xs={12} key={index}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Order Date: {mealOrder.date}
                      </Typography>
                      <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Meal</TableCell>
                              <TableCell>Price</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {mealOrder.meals.map((meal, mealIndex) => (
                              <TableRow key={mealIndex}>
                                <TableCell>{meal.title}</TableCell>
                                <TableCell>
                                  {meal.price} {NIS}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                          <TableFooter>
                            <TableRow>
                              <TableCell>Total</TableCell>
                              <TableCell>
                                {mealOrder.meals.reduce(
                                  (acc, item) => acc + item.price,
                                  0
                                )}{" "}
                                {NIS}
                              </TableCell>
                            </TableRow>
                          </TableFooter>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Modal.Body>
      </Modal>

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

export default Profile;
