import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { api } from "../../../scripts/Declarations";

function DeleteOrder() {
  const [orderId, setOrderId] = useState("");
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSucceeded(false);
    api
      .delete(`/smart-restaurant/admin/delete?object=order&id=${orderId}`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setSucceeded(true);
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div style={{ display: "flow-root" }}>
      <div className="d-flex justify-content-center mt-4">
        <h1>Delete Order</h1>
      </div>
      <hr />
      <form onSubmit={handleSubmit} className="mt-5 w-50 mx-auto">
        <div className="mb-3">
          <TextField
            label="Enter Order ID"
            type="text"
            variant="outlined"
            fullWidth
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            helperText="(format: O + order number. example : O1)"
          />
        </div>
        <Button type="submit" variant="contained" color="error">
          Delete
        </Button>
      </form>
      <hr />
      {succeeded && (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <div className=" bg-white p-4 rounded-4 shadow w-50">
            <div className="d-flex justify-content-center align-items-center">
              <h3 style={{ color: "green" }}>
                Order <span style={{ fontWeight: "bold" }}>{orderId}</span>{" "}
                deleted successfully
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteOrder;
