import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { api } from "../../../scripts/Declarations";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableFooter from "@mui/material/TableFooter";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

function AddTable() {
  const [seats, setSeats] = useState("");
  const [table, setTable] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // parse to integer
    const seatNumber = parseInt(seats, 10);
    if (seatNumber > 0) {
      const body = {
        seats_number: seatNumber,
      };

      api
        .post(`/smart-restaurant/admin/add/table`, body)
        .then((response) => {
          setTable(response.data.data);
          setSeats("");
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } else {
      alert(`seats cant be 0`);
    }
  };

  return (
    <div style={{ display: "flow-root" }}>
      <div className="d-flex justify-content-center mt-4">
        <h1>Add Table</h1>
      </div>
      <hr />
      <form onSubmit={handleSubmit} className="mt-5 w-50 mx-auto">
        <div className="mb-3">
          <TextField
            label="Number of Seats (2 - 8 seats)"
            type="number"
            variant="outlined"
            fullWidth
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            inputProps={{ min: "1" }} // Optional: set minimum number of seats
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      <hr />
      {table && (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <div className=" bg-white p-4 rounded-4 shadow w-50">
            <div className="d-flex justify-content-center align-items-center">
              <h3 style={{ color: "green", fontWeight: "Bold" }}>
                New Table Added Successfully
              </h3>
            </div>
            <hr />
            <TableContainer className="shadow" component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Table Id</TableCell>
                    <TableCell> {table.tableId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Seats number</TableCell>
                    <TableCell>{table.seats_number}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Booked</TableCell>
                    <TableCell>{table.isBooked ? "Yes" : "No"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Taken</TableCell>
                    <TableCell>{table.isTaken ? "Yes" : "No"}</TableCell>
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

export default AddTable;
