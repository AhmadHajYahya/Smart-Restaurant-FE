import React, { useState, useEffect } from "react";
import { api, NIS } from "../../../scripts/Declarations";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { TableHead } from "@mui/material";
import { useAuth } from "../../../AuthContext";

function ShowAllOrders({ criteria }) {
  const { auth } = useAuth();
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    let url;
    let status;
    if (criteria === "all") {
      url = `/mealOrders/all`;
    } else if (criteria === "Accepted") {
      url = `/mealOrders/all?status=ACCEPTED`;
      status = "ACCEPTED";
    } else if (criteria === "Preparing") {
      url = `/mealOrders/all?status=PREPARING`;
      status = "PREPARING";
    } else if (criteria === "Ready") {
      url = `/mealOrders/all?status=READY`;
      status = "READY";
    }

    // Fetch initial data
    api
      .get(url)
      .then((response) => {
        setOrdersData(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // Set up EventSource for real-time updates
    const eventSource = new EventSource(
      `${process.env.REACT_APP_BASE_URL}/real-time/update/meal-orders${
        status ? `?status=${status}` : ""
      }`,
      {
        withCredentials: true,
      }
    );

    eventSource.onmessage = function (event) {
      const response = JSON.parse(event.data);
      if (response.status === 200 && response.data) {
        setOrdersData(response.data); // Update order data with real-time updates
      }
    };

    return () => {
      eventSource.close();
    };
  }, [criteria]);

  const renderCards = () => {
    return (
      <div className="row row-cols-md-2 row-cols-lg-4 g-4 p-3">
        {ordersData.map((item, index) => (
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
                    <h4 style={{ fontWeight: "bold" }}>{item.mOrderID}</h4>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className="tcw">Table</TableCell>
                  <TableCell className="tcw">{item.table.tableId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="tcw">Time</TableCell>
                  <TableCell className="tcw">{item.time}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="tcw">Guest</TableCell>
                  <TableCell className="tcw">{item.user.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="tcw">Status</TableCell>
                  <TableCell className="tcw">{item.status}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="tcw">Meals</TableCell>
                  <TableCell className="tcw">
                    <ul>
                      {item.meals.map((meal, index) => (
                        <li key={index}>{meal.title}</li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="tcw">Total Price</TableCell>
                  <TableCell className="tcw">
                    {item.meals.reduce((acc, item) => acc + item.price, 0)}{" "}
                    {NIS}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ))}
      </div>
    );
  };

  return (
    <div>
      {ordersData.length === 0 ? (
        <div className="text-center">
          <h4>No {criteria === "all" ? "" : criteria} Orders</h4>
        </div>
      ) : (
        <div>{renderCards()}</div>
      )}
    </div>
  );
}

export default ShowAllOrders;
