import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useData } from "../../DataContext";
import { NIS } from "../../scripts/Declarations";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import "./MenuStyle.css";

function MealCard({ mealData }) {
  const { addItem, totalPrice, setTotalPrice } = useData();
  const [inExternalMenu, setInExternalMenu] = useState(false);

  const handleShoppingCartClick = () => {
    addItem(mealData);
    setTotalPrice(totalPrice + mealData.price);
  };

  useEffect(() => {
    const url = String(window.location.href);
    if (url.includes("/menu")) {
      setInExternalMenu(true);
    } else {
      setInExternalMenu(false);
    }
  }, []);

  return (
    <Card className="meal-card" elevation={3}>
      <CardMedia
        component="img"
        height="140"
        image={mealData.imageURL}
        alt={mealData.title}
        className="card-image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {mealData.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {mealData.description}
        </Typography>
        <Rating
          name="half-rating-read"
          defaultValue={mealData.rating}
          precision={0.1}
          readOnly
        />
      </CardContent>
      <CardActions>
        <Typography variant="h6">
          {NIS} {mealData.price}
        </Typography>
        {!inExternalMenu && (
          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            onClick={handleShoppingCartClick}
          >
            <AddShoppingCartIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}

export default MealCard;
