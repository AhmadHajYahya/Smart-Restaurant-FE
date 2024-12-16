import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { api } from "../../../scripts/Declarations";

function DeleteUser() {
  const [userId, setUserId] = useState("");
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSucceeded(false);
    api
      .delete(`/smart-restaurant/admin/delete?object=user&id=${userId}`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setSucceeded(true);
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err.response);
      });
  };

  return (
    <div style={{ display: "flow-root" }}>
      <div className="d-flex justify-content-center mt-4">
        <h1>Delete User</h1>
      </div>
      <hr />
      <form onSubmit={handleSubmit} className="mt-5 w-50 mx-auto">
        <div className="mb-3">
          <TextField
            label="Enter User ID"
            type="text"
            variant="outlined"
            fullWidth
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            helperText="(format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"
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
                User <span style={{ fontWeight: "bold" }}>{userId}</span>{" "}
                deleted successfully
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteUser;
