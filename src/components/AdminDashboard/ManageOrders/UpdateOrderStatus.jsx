import React, { useState } from "react";
import { api, NIS } from "../../../scripts/Declarations";
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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function UpdateOrder() {
  const [updated, setUpdated] = useState(null);
  const [orderDetails, setOrderDetails] = useState({
    orderId: "",
    status: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    api
      .put(
        `/mealOrders/update?orderId=${orderDetails.orderId}&status=${orderDetails.status}`,
        {}
      )
      .then((response) => {
        setUpdated(true);
      })
      .catch((err) => {
        console.error(err.response ? err.response.data : "Error occurred");
      });
  };

  return (
    <div style={{ display: "flow-root" }}>
      <div className="d-flex justify-content-center mt-4">
        <h1>Update Order Status</h1>
      </div>
      <hr />
      <form onSubmit={handleSubmit} className="mt-5 w-50 mx-auto">
        <TextField
          label="Order ID"
          type="text"
          variant="outlined"
          fullWidth
          value={orderDetails.orderId}
          onChange={(e) =>
            setOrderDetails({ ...orderDetails, orderId: e.target.value })
          }
          className="mb-3"
          helperText="(format: O + order number. example : O1)"
        />
        <FormControl fullWidth className="mb-3">
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={orderDetails.status}
            label="Status"
            onChange={(e) =>
              setOrderDetails({ ...orderDetails, status: e.target.value })
            }
          >
            <MenuItem value={"ACCEPTED"}>Accepted</MenuItem>
            <MenuItem value={"PREPARING"}>Preparing</MenuItem>
            <MenuItem value={"READY"}>Ready</MenuItem>
            <MenuItem value={"DONE"}>Done</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      <hr />
      {updated && (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <div className=" bg-white p-4 rounded-4 shadow w-50">
            <div className="d-flex justify-content-center align-items-center">
              <h3 style={{ color: "green", fontWeight: "Bold" }}>
                Order Status Updated Successfully
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateOrder;
