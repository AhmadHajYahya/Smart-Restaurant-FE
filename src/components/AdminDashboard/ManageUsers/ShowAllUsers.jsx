import React, { useState, useEffect } from "react";
import { api } from "../../../scripts/Declarations";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { TableHead } from "@mui/material";
import { capitalizeFirstLetter } from "../../../scripts/HelperFunctions";

function ShowAllUsers({ type }) {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    let url;
    if (type == "all") {
      url = `/smart-restaurant/admin/users/all`;
    } else if (type == "guest") {
      url = `/smart-restaurant/admin/users/all?role=GUEST_USER`;
    } else if (type == "registered") {
      url = `/smart-restaurant/admin/users/all?role=REGISTERED_USER`;
    } else if (type == "admin") {
      url = `/smart-restaurant/admin/users/all?role=ADMIN`;
    } else if (type == "cook") {
      url = `/smart-restaurant/admin/users/all?role=COOK`;
    } else {
      url = `/smart-restaurant/admin/users/all?role=WAITER`;
    }
    api
      .get(url)
      .then((response) => {
        setUsersData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {usersData.length === 0 ? (
        <div className="text-center">
          <h4>No {type === "all" ? "" : capitalizeFirstLetter(type)} Users</h4>
        </div>
      ) : (
        <div className="row row-cols-md-2 row-cols-lg-4 g-4 p-3">
          {usersData.map((user, index) => (
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
                      <h4 style={{ fontWeight: "bold" }}>{index + 1}</h4>
                    </TableCell>
                  </TableRow>
                </TableHead>
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
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowAllUsers;
