import React, { useState } from "react";
import { api } from "../../../scripts/Declarations";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

function UpdateTable() {
  const [table, setTable] = useState(null);
  const [tableDetails, setTableDetails] = useState({
    tableId: "",
    seats: "",
    isTaken: false,
    isBooked: false,
    userId: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const seatNumber = parseInt(tableDetails.seats, 10);

    if (seatNumber > 0 || tableDetails.seats == "") {
      const body = {
        tableId: tableDetails.tableId,
        seats_number: seatNumber,
        isTaken: tableDetails.isTaken,
        isBooked: tableDetails.isBooked,
        userId: tableDetails.userId,
      };

      api
        .put(`/smart-restaurant/admin/update/table`, body)
        .then((response) => {
          setTable(response.data.data);
          setTableDetails({ ...tableDetails, seats: "" }); // Resetting seats
        })
        .catch((err) => {
          console.error(err.response ? err.response.data : "Error occurred");
        });
    } else {
      alert("Seats number must be greater than 0.");
    }
  };

  return (
    <div style={{ display: "flow-root" }}>
      <div className="d-flex justify-content-center mt-4">
        <h1>Update Table</h1>
      </div>
      <hr />
      <form onSubmit={handleSubmit} className="mt-5 w-50 mx-auto">
        <TextField
          label="Table ID"
          type="text"
          variant="outlined"
          fullWidth
          value={tableDetails.tableId}
          onChange={(e) =>
            setTableDetails({ ...tableDetails, tableId: e.target.value })
          }
          className="mb-3"
          helperText="(format: T + table number. example : T1)"
        />
        <TextField
          label="Number of Seats (2 - 8 seats)"
          type="number"
          variant="outlined"
          fullWidth
          value={tableDetails.seats}
          onChange={(e) =>
            setTableDetails({ ...tableDetails, seats: e.target.value })
          }
          inputProps={{ min: "1" }}
          className="mb-3"
        />
        <FormControlLabel
          control={
            <Switch
              checked={tableDetails.isTaken}
              onChange={(e) =>
                setTableDetails({ ...tableDetails, isTaken: e.target.checked })
              }
            />
          }
          label="Is Taken"
          className="mb-3"
        />
        <FormControlLabel
          control={
            <Switch
              checked={tableDetails.isBooked}
              onChange={(e) =>
                setTableDetails({ ...tableDetails, isBooked: e.target.checked })
              }
            />
          }
          label="Is Booked"
          className="mb-3"
        />
        <TextField
          label="User ID (optional)"
          type="text"
          variant="outlined"
          fullWidth
          value={tableDetails.userId}
          onChange={(e) =>
            setTableDetails({ ...tableDetails, userId: e.target.value })
          }
          className="mb-3"
        />
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
                Table Updated Successfully
              </h3>
            </div>
            <hr />
            <TableContainer className="shadow" component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Table Id</TableCell>
                    <TableCell>{table.tableId}</TableCell>
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

export default UpdateTable;
