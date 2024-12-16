import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { api } from "../../../scripts/Declarations";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import "../AdminDashboardStyle.css";

function ShowBooking() {
  const [bookingId, setBookingId] = useState("");
  const [booking, setBooking] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(bookingId);
    api
      .get(`/bookings/booking?id=${bookingId}`)
      .then((response) => {
        setBooking(response.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  return (
    <div style={{ display: "flow-root" }}>
      <div className="d-flex justify-content-center mt-4">
        <h1>Show Booking</h1>
      </div>
      <hr />
      <form onSubmit={handleSubmit} className="mt-5 w-50 mx-auto">
        <div className="mb-3">
          <TextField
            label="Enter Booking ID"
            type="text"
            variant="outlined"
            fullWidth
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            helperText="(format: B + booking number. example : B1)"
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Show
        </Button>
      </form>
      <hr />
      {booking && (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <div className=" bg-white p-4 rounded-4 shadow w-50">
            <div className="d-flex justify-content-center align-items-center">
              <h3 style={{ color: "green", fontWeight: "Bold" }}>
                Found Booking
              </h3>
            </div>
            <hr />
            <TableContainer className="shadow me-2" component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="tcw">Booking ID</TableCell>
                    <TableCell className="tcw">{booking.bookingId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Guest ID</TableCell>
                    <TableCell className="tcw">{booking.userId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Guests Number</TableCell>
                    <TableCell className="tcw">
                      {booking.guestsNumber}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Date</TableCell>
                    <TableCell className="tcw">{booking.date}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Time</TableCell>
                    <TableCell className="tcw">{booking.time}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </div>
  );
}
export default ShowBooking;
