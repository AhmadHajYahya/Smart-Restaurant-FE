import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { api, NIS } from "../../../scripts/Declarations";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import "../AdminDashboardStyle.css";

function ShowOrder() {
  const [orderId, setOrderId] = useState(null);
  const [order, setOrder] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setOrderId(null);
    api
      .get(`/mealOrders/mealOrder?id=${orderId}`)
      .then((response) => {
        setOrder(response.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  return (
    <div style={{ display: "flow-root" }}>
      <div className="d-flex justify-content-center mt-4">
        <h1>Show Order</h1>
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
        <Button type="submit" variant="contained" color="primary">
          Show
        </Button>
      </form>
      <hr />
      {order && (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <div className=" bg-white p-4 rounded-4 shadow w-50">
            <div className="d-flex justify-content-center align-items-center">
              <h3 style={{ color: "green", fontWeight: "Bold" }}>
                Found Order
              </h3>
            </div>
            <hr />
            <TableContainer className="shadow" component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="tcw">Order Id</TableCell>
                    <TableCell className="tcw"> {order.mOrderID}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Table</TableCell>
                    <TableCell className="tcw">{order.table.tableId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Time</TableCell>
                    <TableCell className="tcw">{order.time}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Guest</TableCell>
                    <TableCell className="tcw">{order.user.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Status</TableCell>
                    <TableCell className="tcw">{order.status}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Total Preparing Time</TableCell>
                    <TableCell className="tcw">
                      {order.totalPreparingTime} min
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Meals</TableCell>
                    <TableCell className="tcw">
                      {
                        <ul>
                          {order.meals.map((meal, index) => (
                            <li key={index}>{meal.title}</li>
                          ))}
                        </ul>
                      }
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Total Price</TableCell>
                    <TableCell className="tcw">
                      {order.meals.reduce((acc, item) => acc + item.price, 0)}{" "}
                      {NIS}
                    </TableCell>
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

export default ShowOrder;
