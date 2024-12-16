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
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { capitalizeFirstLetter } from "../../../scripts/HelperFunctions";
import { Typography } from "@mui/material";
import { Input } from "@mui/material";
const categories = ["BURGER", "SNACK", "SALAD", "DRINK"];

function AddMeal() {
  const [meal, setMeal] = useState(null);
  const [mealData, setMealData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    available: true,
    preparingTime: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
    setFile(null);
  };

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
      setImageUrl("");
    }
  };

  const handleToggleChange = (event, value) => {
    setMealData({ ...mealData, available: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // Append the meal data as a JSON string
    formData.append(
      "meal",
      JSON.stringify({ ...mealData, imageURL: imageUrl })
    );

    if (file) {
      formData.append("ImageFile", file);
    }
    // Here you would typically send the data to a server
    api
      .post(`/smart-restaurant/admin/add/meal`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setMeal(response.data.data);
        setMealData({
          title: "",
          description: "",
          price: "",
          category: "",
          available: true,
          preparingTime: "",
        });
        setImageUrl("");
        setFile(null);
      })
      .catch((error) => console.log(error.response));
  };

  return (
    <div style={{ display: "flow-root" }}>
      <div className="d-flex justify-content-center mt-4">
        <h1>Add Meal</h1>
      </div>
      <hr />
      <form onSubmit={handleSubmit} className="mt-5 w-50 mx-auto">
        <TextField
          className="mb-3"
          label="Meal Title"
          type="text"
          variant="outlined"
          fullWidth
          value={mealData.title}
          onChange={(e) => setMealData({ ...mealData, title: e.target.value })}
          required
        />
        <TextField
          className="mb-3"
          label="Description"
          type="text"
          variant="outlined"
          fullWidth
          value={mealData.description}
          onChange={(e) =>
            setMealData({ ...mealData, description: e.target.value })
          }
          required
        />
        <TextField
          className="mb-3"
          label="Price"
          type="text"
          variant="outlined"
          fullWidth
          value={mealData.price}
          onChange={(e) => setMealData({ ...mealData, price: e.target.value })}
          required
        />
        <TextField
          className="mb-3"
          label="Preparing Time (in minutes)"
          type="number"
          variant="outlined"
          fullWidth
          value={mealData.preparingTime}
          onChange={(e) =>
            setMealData({ ...mealData, preparingTime: e.target.value })
          }
          required
        />
        <FormControl fullWidth className="mb-3">
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={mealData.category}
            label="Category"
            onChange={(e) =>
              setMealData({ ...mealData, category: e.target.value })
            }
            required
          >
            <MenuItem value={categories.at(0)}>
              {capitalizeFirstLetter(categories.at(0))}
            </MenuItem>
            <MenuItem value={categories.at(1)}>
              {capitalizeFirstLetter(categories.at(1))}
            </MenuItem>
            <MenuItem value={categories.at(2)}>
              {capitalizeFirstLetter(categories.at(2))}
            </MenuItem>
            <MenuItem value={categories.at(3)}>
              {capitalizeFirstLetter(categories.at(3))}
            </MenuItem>
          </Select>
        </FormControl>
        <div className="d-flex justify-content-start align-items-center mb-3">
          <Typography variant="h6" className="me-5 p-2">
            Available
          </Typography>
          <ToggleButtonGroup
            color="primary"
            value={mealData.available}
            exclusive
            onChange={handleToggleChange}
            aria-label="Platform"
          >
            <ToggleButton value={true}>Yes</ToggleButton>
            <ToggleButton value={false}>No</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div>
          <Typography variant="h6" className="me-5 p-2">
            Upload Image
          </Typography>
          <TextField
            label="Image URL"
            variant="outlined"
            value={imageUrl}
            onChange={handleImageUrlChange}
            fullWidth
            disabled={file !== null}
            className="mb-3"
          />
          <Typography variant="h6" className="me-5 p-2">
            Or
          </Typography>
          <Input
            className="d-block mb-5"
            type="file"
            onChange={handleFileChange}
            disabled={imageUrl !== ""}
            style={{ margin: "20px 0" }}
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      <hr />
      {meal && (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <div className=" bg-white p-4 rounded-4 shadow w-50">
            <div className="d-flex justify-content-center align-items-center">
              <h3 style={{ color: "green", fontWeight: "Bold" }}>
                Meal Created Successfully
              </h3>
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

export default AddMeal;
