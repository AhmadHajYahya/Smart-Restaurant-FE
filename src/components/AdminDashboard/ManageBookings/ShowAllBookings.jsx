import React, { useState, useEffect } from "react";
import { api } from "../../../scripts/Declarations";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { TableHead } from "@mui/material";

function ShowAllBookings() {
  const [bookingsData, setBookingsData] = useState([]);

  useEffect(() => {
    api
      .get(`/bookings/all`)
      .then((response) => {
        setBookingsData(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  return (
    <div>
      {bookingsData.length === 0 ? (
        <div className="text-center">
          <h4>No bookings created</h4>
        </div>
      ) : (
        <div className="row  row-cols-md-2 row-cols-lg-4 g-4 p-3">
          {bookingsData.map((booking, index) => (
            <TableContainer
              style={{ width: "30%" }}
              key={index}
              className="col shadow me-2"
              component={Paper}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <h4 style={{ fontWeight: "bold" }}>
                        {booking.bookingId}
                      </h4>
                    </TableCell>
                  </TableRow>
                </TableHead>
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
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowAllBookings;
