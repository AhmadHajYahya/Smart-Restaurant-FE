import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import MealCard from "./MealCard";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { api } from "../../scripts/Declarations";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import "./MenuStyle.css";

const sortBy = ["Price", "Rating", "Popular", "Name"];
const categories = ["Burger", "Snack", "Salad", "Drink"];

function Menu() {
  const [value, setValue] = useState("1");
  const [mealsData, setMealsData] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("BURGER");
  const [select, setSelected] = useState("");
  const [search, setSearch] = useState("");

  const fetchMeals = (category, sortField, searchTerm) => {
    let url;
    if (searchTerm) {
      url = `/menu/search-by/contains`;
    } else if (sortField) {
      url = `/menu/sort-by/${sortField.toLowerCase()}?category=${category}`;
    } else {
      url = `/menu/category?category=${category}`;
    }

    if (searchTerm) {
      const body = { str: searchTerm };
      api
        .post(url, body)
        .then((response) => {
          setMealsData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      api
        .get(url)
        .then((response) => {
          setMealsData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (search) {
      fetchMeals(currentCategory, "", search);
    } else if (select) {
      fetchMeals(currentCategory, select, "");
    } else {
      fetchMeals(currentCategory);
    }
  }, [select, search, currentCategory]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const category = categories[newValue - 1].toUpperCase();
    setCurrentCategory(category);
  };

  const handleSelectChange = (event) => {
    setSearch("");
    setSelected(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSelected("");
    setSearch(event.target.value);
  };

  const handleClear = () => {
    setSearch("");
    setSelected("");
  };

  const renderMealsByCategory = (category) => {
    const filteredMeals = mealsData.filter(
      (meal) => meal.category === category
    );

    return (
      <Grid container spacing={4}>
        {filteredMeals.map((meal, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <MealCard mealData={meal} />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Container maxWidth="lg">
      <Box
        className="search-filter-inputs"
        display="flex"
        justifyContent="center"
        alignItems="center"
        my={4}
      >
        <TextField
          id="outlined-search"
          label="Search"
          type="search"
          value={search}
          onChange={handleSearchChange}
          style={{ width: "40%", marginRight: "7px" }}
        />
        <FormControl fullWidth sx={{ minWidth: 160 }}>
          <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={select}
            label="Sort by"
            onChange={handleSelectChange}
          >
            {sortBy.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          style={{
            visibility: select !== "" || search !== "" ? "visible" : "hidden",
          }}
          onClick={handleClear}
        >
          Clear
        </Button>
      </Box>
      <TabContext value={value}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider" }}
          className="d-flex justify-content-center"
        >
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            variant="scrollable"
          >
            <Tab label={categories[0]} value="1" />
            <Tab label={categories[1]} value="2" />
            <Tab label={categories[2]} value="3" />
            <Tab label={categories[3]} value="4" />
          </TabList>
        </Box>

        <TabPanel value="1">{renderMealsByCategory("BURGER")}</TabPanel>
        <TabPanel value="2">{renderMealsByCategory("SNACK")}</TabPanel>
        <TabPanel value="3">{renderMealsByCategory("SALAD")}</TabPanel>
        <TabPanel value="4">{renderMealsByCategory("DRINK")}</TabPanel>
      </TabContext>
    </Container>
  );
}

export default Menu;
