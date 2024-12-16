import React from "react";
import { Container, Typography, Box } from "@mui/material";

function About() {
  return (
    <Container maxWidth="lg" id="about" className="p-0">
      <Box mt={5} mb={5} textAlign="center">
        <Typography variant="h2" className="fw-bold my-5">
          About Us
        </Typography>
        <Typography
          variant="body1"
          className="fw-bold mb-4 mb-lg-0 w-lg-50 mx-auto"
        >
          Welcome to Burger, where technology meets taste! Our Smart Restaurant
          App revolutionizes the dining experience by offering seamless,
          real-time service right at your fingertips. Login to access our
          diverse menu, customize your orders, and track your meal's progress in
          real-time. Whether you're craving our signature gourmet burgers,
          crispy fries, or refreshing drinks, our app ensures that your
          preferences are always just a tap away. Enjoy personalized
          recommendations, and swift payments, all designed to enhance your
          visit. At Burger, we blend innovative technology with culinary
          excellence to deliver an unforgettable dining experience.
        </Typography>
      </Box>
    </Container>
  );
}

export default About;
