import Rating from "@mui/material/Rating";
import "../../Menu/MenuStyle.css";
import React, { useState, useEffect } from "react";
import { api, NIS } from "../../../scripts/Declarations";

function ShowMeals({ available = true }) {
  const [mealsData, setMealsData] = useState([]);

  useEffect(() => {
    api
      .get(`/meals/all?available=${available}`)
      .then((response) => {
        setMealsData(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  return (
    <div>
      {mealsData.length === 0 ? (
        <div className="d-flex justify-content-center">
          <h4>No {available ? "Available" : "Unavailable"} Meals Found</h4>
        </div>
      ) : (
        <div className="d-flex flex-wrap justify-content-center">
          {mealsData.map((meal, index) => (
            <div key={index} className="meal-card d-flex mt-4 me-4 ms-2">
              <h3 className="me-3">{meal.mealId}</h3>
              <div className="image-div">
                <img
                  src={meal.imageURL}
                  alt=""
                  className="card-image card-image"
                />
              </div>
              <div className="ps-3" style={{ width: "70%" }}>
                <h3>{meal.title}</h3>
                <p>{meal.description}</p>
                <Rating
                  name="half-rating-read"
                  defaultValue={meal.rating}
                  precision={0.1}
                  readOnly
                />
              </div>
              <div
                className="ps-4 d-flex flex-column justify-content-between align-items-center"
                style={{ width: "11%" }}
              >
                <h5>
                  {NIS} {meal.price}
                </h5>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowMeals;
