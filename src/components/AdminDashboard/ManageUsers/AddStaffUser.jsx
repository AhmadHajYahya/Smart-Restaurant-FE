import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { api } from "../../../scripts/Declarations";

function AddStaffUser() {
  const [newUser, setNewUser] = useState(null);
  const [userData, setUserData] = useState({
    username: "",
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      username: userData.username,
      name: userData.name,
      phoneNumber: userData.phoneNumber,
      role: userData.role,
      password: userData.password,
      email: userData.email,
    };
    // Here you would typically send the data to a server
    api
      .post(`/users/register`, body)
      .then((response) => {
        setNewUser(response.data.data);
        setUserData({
          username: "",
          name: "",
          phoneNumber: "",
          email: "",
          password: "",
          role: "",
        });
      })
      .catch((error) => alert(error.response.data.message));
  };

  return (
    <div style={{ display: "flow-root" }}>
      <div className="d-flex justify-content-center mt-4">
        <h1>Add Staff User</h1>
      </div>
      <hr />
      <form onSubmit={handleSubmit} className="mt-5 w-50 mx-auto">
        <TextField
          className="mb-3"
          label="Username"
          type="text"
          variant="outlined"
          fullWidth
          value={userData.username}
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
          required
        />
        <TextField
          className="mb-3"
          label="Personal Name"
          type="text"
          variant="outlined"
          fullWidth
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          required
        />
        <TextField
          className="mb-3"
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          required
        />
        <TextField
          className="mb-3"
          label="Phone Number"
          type="text"
          variant="outlined"
          fullWidth
          value={userData.phoneNumber}
          onChange={(e) =>
            setUserData({ ...userData, phoneNumber: e.target.value })
          }
          required
        />
        <TextField
          className="mb-3"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          required
        />
        <FormControl fullWidth className="mb-3">
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            labelId="role-select-label"
            id="role-select"
            value={userData.role}
            label="Role"
            onChange={(e) => setUserData({ ...userData, role: e.target.value })}
            required
          >
            <MenuItem value={"COOK"}>Cook</MenuItem>
            <MenuItem value={"WAITER"}>Waiter</MenuItem>
            <MenuItem value={"ADMIN"}>Admin</MenuItem>
            <MenuItem value={"GUEST_USER"}>Guest user</MenuItem>
            <MenuItem value={"REGISTERED_USER"}>Registered user</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      <hr />
      {newUser && (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <div className=" bg-white p-4 rounded-4 shadow w-50">
            <div className="d-flex justify-content-center align-items-center">
              <h3 style={{ color: "green", fontWeight: "Bold" }}>
                New User Added Successfully
              </h3>
            </div>
            <hr />
            <TableContainer className="shadow me-2" component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="tcw">Username</TableCell>
                    <TableCell className="tcw">{newUser.username}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Phone number</TableCell>
                    <TableCell className="tcw">{newUser.phoneNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Role</TableCell>
                    <TableCell className="tcw">{newUser.role}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Email</TableCell>
                    <TableCell className="tcw">{newUser.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">User Id</TableCell>
                    <TableCell className="tcw">{newUser.userId}</TableCell>
                  </TableRow>
                  {newUser.role == "REGISTERED_USER" && (
                    <>
                      <TableRow>
                        <TableCell className="tcw">Orders count</TableCell>
                        <TableCell className="tcw">
                          {newUser.ordersCount}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="tcw">Bookings count</TableCell>
                        <TableCell className="tcw">
                          {newUser.bookingsCount}
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

export default AddStaffUser;
