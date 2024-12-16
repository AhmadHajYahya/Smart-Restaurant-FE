import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { NIS } from "../../scripts/Declarations";
const MealCard = ({ meal }) => (
  <Card sx={{ display: "flex", mb: 2 }}>
    <CardMedia
      component="img"
      sx={{ width: 151 }}
      image={meal.imageURL}
      alt={meal.title}
    />
    <CardContent>
      <Typography component="div" variant="h6">
        {meal.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" component="div">
        {meal.description}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Price: {NIS}{meal.price}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Category: {meal.category}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Orders: {meal.orderCount}
      </Typography>
    </CardContent>
  </Card>
);

export default MealCard;
