import React, { useEffect, useState } from "react";
import { api } from "../../scripts/Declarations";
import { useData } from "../../DataContext";
import Modal from "react-bootstrap/Modal";
import Rating from "@mui/material/Rating";
import Button from "react-bootstrap/Button";
import "../Menu/MenuStyle.css";
function RateMeal({ showRatingMealModal, setshowRatingMealModal }) {
  //const [showModal, setShowModal] = useState(true);
  const [rateValue, setRateValue] = useState(3.5);
  const { mealOrderID } = useData();
  const [mealToRate, setMealToRate] = useState("");

  const handleCloseModal = () => {
    setshowRatingMealModal(false);
  };
  useEffect(() => {
    api
      .get(`/mealOrders/mealOrder?id=${mealOrderID}`)
      .then((response) => {
        const meals = response.data.data.meals;
        const randomMeal = meals[Math.floor(Math.random() * meals.length)];
        setMealToRate(randomMeal);
      })
      .catch((err) => {
        //console.log(err.response.data);
      });
  }, [rateValue]);

  const submitRate = () => {
    const body = {
      mealId: mealToRate.mealId,
      rating: Number(rateValue),
    };
    api
      .post(`/meals/rate-meal`, body)
      .then((response) => {
        alert(response.data.message);
        setshowRatingMealModal(false);
      })
      .catch((err) => {
        // console.log(err.response.data);
      });
  };
  return (
    <div>
      {/* Rate Meal Modal */}
      <Modal show={showRatingMealModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Rate This Meal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column align-items-center">
            <h3>{mealToRate.title}</h3>
            <div className="d-flex justify-content-center align-items-center mb-3">
              <div
                className="image-div my-3"
                style={{ width: "200px", height: "200px" }}
              >
                <img
                  src={mealToRate.imageURL}
                  alt=""
                  className="card-image card-image"
                />
              </div>
            </div>
            <Rating
              name="half-rating"
              size="large"
              defaultValue={3}
              precision={0.5}
              value={rateValue}
              onChange={(e) => setRateValue(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={submitRate}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RateMeal;
