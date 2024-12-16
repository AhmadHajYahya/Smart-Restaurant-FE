import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Button,
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { initDataAndTime } from "../../scripts/HelperFunctions";
import { useAuth } from "../../AuthContext";
import { api } from "../../scripts/Declarations";
import NavBar from "../NavBar/MainNavBar";

function Booking() {
  const { auth } = useAuth();
  const [today, setToday] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [timeOptions, setTimeOptions] = useState([]);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [guestsNumber, setGuestsNumber] = useState("");
  const [userBookings, setUserBookings] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const guestsOptions = Array.from({ length: 15 }, (_, i) => i + 2);

  useEffect(() => {
    let data = initDataAndTime();

    setToday(data.today);
    setMaxDate(data.maxDate);
    setTimeOptions(data.timeOptions);
    setBookingDate(data.bookingDate);
  }, []);

  function getUserBookings() {
    api
      .get(`/bookings/all/user-bookings?userId=${auth.userData.userId}`)
      .then((response) => {
        setUserBookings(response.data.data);
      })
      .catch((err) => {
        setSnackbarMessage(err.response.data.message);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  }

  useEffect(() => {
    getUserBookings();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = {
      userId: auth.userData.userId,
      guestsNumber: guestsNumber,
      date: bookingDate,
      time: bookingTime,
    };
    api
      .post(`/bookings/add`, body)
      .then((response) => {
        setSnackbarMessage(response.data.message);
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        getUserBookings();
      })
      .catch((err) => {
        setSnackbarMessage(err.response.data.message);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  const handleCancelBooking = (booking) => {
    api
      .delete(`/bookings/delete?bookingId=${booking.bookingId}`)
      .then(() => {
        setSnackbarMessage("Booking Cancelled");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        getUserBookings();
      })
      .catch((err) => {
        setSnackbarMessage(err.response.data.message);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="md">
        <Box mt={4} mb={4}>
          <Typography variant="h4" align="center">
            Booking
          </Typography>
        </Box>
        <Paper elevation={3} className="p-4">
          <Box mb={4}>
            <Typography variant="h5" align="center" gutterBottom>
              Book a table
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    type="date"
                    label="Date"
                    variant="outlined"
                    fullWidth
                    value={bookingDate}
                    inputProps={{
                      min: today,
                      max: maxDate,
                    }}
                    onChange={(e) => setBookingDate(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Time</InputLabel>
                    <Select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      label="Time"
                    >
                      {timeOptions.map((time, index) => (
                        <MenuItem key={index} value={time}>
                          {time}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Guests</InputLabel>
                    <Select
                      value={guestsNumber}
                      onChange={(e) => setGuestsNumber(e.target.value)}
                      label="Guests"
                    >
                      {guestsOptions.map((guestOption, index) => (
                        <MenuItem key={index} value={guestOption}>
                          {guestOption} Guests
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} className="text-center">
                  <Button type="submit" variant="contained" color="primary">
                    Make Booking
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
        <Box mt={4}>
          <Typography variant="h5" align="center" gutterBottom>
            Cancel Booking
          </Typography>
          {userBookings.length > 0 ? (
            userBookings.map((booking, index) => (
              <Paper key={index} elevation={3} className="p-3 my-2">
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="body1">
                      {booking.date} - {booking.time}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body1">
                      {booking.guestsNumber} Guests
                    </Typography>
                  </Grid>
                  <Grid item xs={4} className="text-right">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleCancelBooking(booking)}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            ))
          ) : (
            <Typography variant="body1" align="center">
              No bookings found.
            </Typography>
          )}
        </Box>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Booking;
