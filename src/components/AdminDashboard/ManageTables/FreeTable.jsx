import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { api } from "../../../scripts/Declarations";

function FreeTable() {
  const [tableId, setTableId] = useState("");
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSucceeded(false);
    api
      .put(`/tables/free-table?tableId=${tableId}`)
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
        <h1>Free Table</h1>
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
          Free
        </Button>
      </form>
      <hr />
      {succeeded && (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <div className=" bg-white p-4 rounded-4 shadow w-50">
            <div className="d-flex justify-content-center align-items-center">
              <h3 style={{ color: "green" }}>
                Table <span style={{ fontWeight: "bold" }}>{tableId}</span>{" "}
                freed successfully
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FreeTable;
