import React, { useState, useEffect } from "react";
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
import "../../Menu/MenuStyle.css";

function ShowMeal() {
  const [meal, setMeal] = useState(null);
  const [mealId, setMealId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    api
      .get(`/meals/meal?id=${mealId}`)
      .then((response) => {
        setMeal(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div style={{ display: "flow-root" }}>
      <div className="d-flex justify-content-center mt-4">
        <h1>Show Meal</h1>
      </div>
      <hr />
      <form onSubmit={handleSubmit} className="mt-5 w-50 mx-auto">
        <div className="mb-3">
          <TextField
            label="Enter Meal ID"
            type="text"
            variant="outlined"
            fullWidth
            value={mealId}
            onChange={(e) => setMealId(e.target.value)}
            helperText="(format: M + meal number. example : M1)"
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Show
        </Button>
      </form>
      <hr />
      {meal && (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <div className=" bg-white p-4 rounded-4 shadow w-50">
            <div className="d-flex justify-content-center align-items-center">
              <h3 style={{ color: "green", fontWeight: "Bold" }}>Found Meal</h3>
            </div>
            <hr />
            <div className="d-flex justify-content-center align-items-center mb-3">
              <div
                className="image-div"
                style={{ width: "200px", height: "200px" }}
              >
                <img
                  src={meal.imageURL}
                  alt=""
                  className="card-image card-image"
                />
              </div>
            </div>
            <TableContainer className="shadow me-2" component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="tcw">Meal ID</TableCell>
                    <TableCell className="tcw">{meal.mealId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Title</TableCell>
                    <TableCell className="tcw">{meal.title}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Description</TableCell>
                    <TableCell className="tcw">{meal.description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Price</TableCell>
                    <TableCell className="tcw">
                      {meal.price} {NIS}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Preparing Time</TableCell>
                    <TableCell className="tcw">
                      {meal.preparingTime} min
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Category</TableCell>
                    <TableCell className="tcw">{meal.category}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Rating</TableCell>
                    <TableCell className="tcw">{meal.rating}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Number Of Rating</TableCell>
                    <TableCell className="tcw">{meal.numberOfRating}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Order Count</TableCell>
                    <TableCell className="tcw">{meal.orderCount}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tcw">Available</TableCell>
                    <TableCell className="tcw">
                      {meal.available ? "Yes" : "No"}
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

export default ShowMeal;
