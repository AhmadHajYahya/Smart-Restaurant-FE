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

function ShowTable() {
  const [tableId, setTableId] = useState(null);
  const [table, setTable] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTable(null);
    api
      .get(`/tables/table?tableId=${tableId}`)
      .then((response) => {
        setTable(response.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  return (
    <div style={{ display: "flow-root" }}>
      <div className="d-flex justify-content-center mt-4">
        <h1>Show Table</h1>
      </div>
      <hr />
      <form onSubmit={handleSubmit} className="mt-5 w-50 mx-auto">
        <div className="mb-3">
          <TextField
            label="Enter Table ID"
            type="text"
            variant="outlined"
            fullWidth
            value={tableId}
            onChange={(e) => setTableId(e.target.value)}
            helperText="(format: T + table number. example : T1)"
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Show
        </Button>
      </form>
      <hr />
      {table && (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <div className=" bg-white p-4 rounded-4 shadow w-50">
            <div className="d-flex justify-content-center align-items-center">
              <h3 style={{ color: "green", fontWeight: "Bold" }}>
                Found Table
              </h3>
            </div>
            <hr />
            <TableContainer className="shadow" component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="tcw">Table Id</TableCell>
                    <TableCell className="tcw"> {table.tableId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Seats number</TableCell>
                    <TableCell className="tcw">{table.seats_number}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Booked</TableCell>
                    <TableCell className="tcw">
                      {table.isBooked ? "Yes" : "No"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Taken</TableCell>
                    <TableCell className="tcw">
                      {table.isTaken ? "Yes" : "No"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">User</TableCell>
                    <TableCell className="tcw">{table.userId}</TableCell>
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

export default ShowTable;
