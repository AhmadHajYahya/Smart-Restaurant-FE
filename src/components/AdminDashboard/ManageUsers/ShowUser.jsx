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

function ShowUser() {
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [user, setUser] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    api
      .get(`/users/user?phoneNumber=${userPhoneNumber}`)
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  return (
    <div style={{ display: "flow-root" }}>
      <div className="d-flex justify-content-center mt-4">
        <h1>Show User</h1>
      </div>
      <hr />
      <form onSubmit={handleSubmit} className="mt-5 w-50 mx-auto">
        <div className="mb-3">
          <TextField
            label="Enter User Phone Number"
            type="text"
            variant="outlined"
            fullWidth
            value={userPhoneNumber}
            onChange={(e) => setUserPhoneNumber(e.target.value)}
            helperText="(format: 05XXXXXXXX)"
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Show
        </Button>
      </form>
      <hr />
      {user && (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <div className=" bg-white p-4 rounded-4 shadow w-50">
            <div className="d-flex justify-content-center align-items-center">
              <h3 style={{ color: "green", fontWeight: "Bold" }}>Found User</h3>
            </div>
            <hr />
            <TableContainer className="shadow me-2" component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="tcw">Username</TableCell>
                    <TableCell className="tcw">{user.username}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Name</TableCell>
                    <TableCell className="tcw">{user.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Phone number</TableCell>
                    <TableCell className="tcw">{user.phoneNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Role</TableCell>
                    <TableCell className="tcw">{user.role}</TableCell>
                  </TableRow>
                  {user.role != "GUEST_USER" && (
                    <TableRow>
                      <TableCell className="tcw">Email</TableCell>
                      <TableCell className="tcw">{user.email}</TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell className="tcw">User Id</TableCell>
                    <TableCell className="tcw">{user.userId}</TableCell>
                  </TableRow>
                  {user.role == "REGISTERED_USER" && (
                    <>
                      <TableRow>
                        <TableCell className="tcw">Orders count</TableCell>
                        <TableCell className="tcw">
                          {user.ordersCount}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="tcw">Bookings count</TableCell>
                        <TableCell className="tcw">
                          {user.bookingsCount}
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowUser;
