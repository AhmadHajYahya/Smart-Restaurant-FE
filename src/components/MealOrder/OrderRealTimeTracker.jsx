import React, { useState, useEffect } from "react";
import { useData } from "../../DataContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { capitalizeFirstLetter } from "../../scripts/HelperFunctions";
import "./OrderTrackerStyle.css";
import {
  Container,
  Paper,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
} from "@mui/material";
import { api } from "../../scripts/Declarations";
import CircularTimeCounter from "../CircularTimeCounter/CircularTimeCounter";
import NavBar from "../NavBar/MainNavBar";

const steps = [
  {
    status: "Accepted",
    description:
      "Your order is accepted, we will start preparing your order soon.",
  },
  {
    status: "Preparing",
    description: "Your order is being prepared, please wait until it is ready.",
  },
  {
    status: "Ready",
    description: "Your order is ready, enjoy your meal.",
  },
];

function OrderRealTimeTracker() {
  const navigate = useNavigate();
  const { mealOrderID, setMealOrderID, preparingTime, setPreparingTime } =
    useData();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    api
      .get(`/mealOrders/mealOrder?id=${mealOrderID}`)
      .then((res) => {
        const { data } = res.data;
        setCurrentStep(
          steps.findIndex(
            (step) => step.status === capitalizeFirstLetter(data.status)
          )
        );
        if (preparingTime == 0) {
          const duration = Math.ceil(
            data.totalPreparingTime / data.meals.length
          );
          setPreparingTime(duration);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    const eventSource = new EventSource(
      `${process.env.REACT_APP_BASE_URL}/real-time/update/order-status?orderId=${mealOrderID}`,
      {
        withCredentials: true,
      }
    );

    eventSource.onmessage = function (event) {
      const data = JSON.parse(event.data);
      if (data.status === 200 && data.data) {
        setCurrentStep(
          steps.findIndex(
            (step) => step.status === capitalizeFirstLetter(data.data.status)
          )
        );
      }
    };

    // Cleanup function to close EventSource
    return () => {
      eventSource.close();
    };
  }, [mealOrderID]);

  const onDone = () => {
    setMealOrderID("");
    localStorage.removeItem("timeLeft");
    navigate(`/in-restaurant`);
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="md" className="mt-4">
        <Paper elevation={3} className="p-4" sx={{ bgcolor: "#fbf0b3" }}>
          <Typography variant="h5" gutterBottom>
            Order ID: {mealOrderID}
          </Typography>
          <Stepper activeStep={currentStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step.status}</StepLabel>
                <Typography variant="body2" color="textSecondary">
                  {step.description}
                </Typography>
              </Step>
            ))}
          </Stepper>
          {currentStep !== steps.length - 1 && (
            <Box mt={4} textAlign="center">
              <Typography variant="h6" gutterBottom>
                Predicted time to prepare the order: {preparingTime} min
              </Typography>
              <CircularTimeCounter duration={preparingTime} />
            </Box>
          )}
          {currentStep === steps.length - 1 && (
            <Box mt={4} textAlign="center">
              <Typography variant="h6" gutterBottom>
                Press <strong>Done</strong> if you got the order
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={onDone}
                className="mt-2"
              >
                Done
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </div>
  );
}

export default OrderRealTimeTracker;
