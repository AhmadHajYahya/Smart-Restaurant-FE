import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Menu from "../Menu/Menu";
import { useData } from "../../DataContext";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import { api, NIS } from "../../scripts/Declarations";
import NavBar from "../NavBar/MainNavBar";
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  IconButton,
  Fab,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CancelIcon from "@mui/icons-material/Cancel";

function MealOrder() {
  const navigate = useNavigate();
  const { data, removeItem, totalPrice, setTotalPrice, setData } = useData();
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleCancel = () => {
    setData([]);
    setTotalPrice(0);
    navigate(`/in-restaurant`);
  };
  const handleRemoveClick = (meal) => {
    setTotalPrice(totalPrice - meal.price);
    removeItem(meal);
  };

  const handleContinue = () => {
    setShowModal(false);
    navigate("/checkout");
  };

  useEffect(() => {
    // Check if data length is 0, then close the modal
    if (data.length === 0) {
      handleCloseModal();
    }
  }, [data]);

  return (
    <div>
      <NavBar />
      <Container maxWidth="lg">
        <Box mt={4} mb={4} textAlign="center">
          <Typography variant="h4">Place Your Order</Typography>
        </Box>
        <Menu />
        <Stack position="fixed" bottom={16} right={16} spacing={2}>
          <Badge badgeContent={data.length} color="secondary">
            <Fab
              color="primary"
              aria-label="check & order"
              onClick={handleShowModal}
            >
              <ShoppingCartIcon />
            </Fab>
          </Badge>
          <Fab color="error" aria-label="cancel" onClick={handleCancel}>
            <CancelIcon />
          </Fab>
        </Stack>

        {/* Modal */}
        <Dialog
          open={showModal}
          onClose={handleCloseModal}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            <Typography variant="h6">Check your meals:</Typography>
          </DialogTitle>
          <DialogContent dividers>
            {data.map((item) => (
              <Paper
                key={item.mealId}
                elevation={3}
                className="d-flex justify-content-between align-items-center mb-2 p-2"
              >
                <Box display="flex" alignItems="center" width="100%">
                  <img
                    src={item.imageURL}
                    alt={item.title}
                    style={{
                      height: "80px",
                      width: "80px",
                      borderRadius: "5px",
                    }}
                  />
                  <Box ml={2} flexGrow={1}>
                    <Typography variant="h6">{item.title}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6">
                      {NIS} {item.price}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => handleRemoveClick(item)}
                    style={{ color: "red" }}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                </Box>
              </Paper>
            ))}
          </DialogContent>
          <DialogActions>
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              p={2}
            >
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">
                {totalPrice} {NIS}
              </Typography>
            </Box>
            <Divider />
            <Box display="flex" justifyContent="flex-end" width="100%" p={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCloseModal}
                className="me-2"
              >
                Close
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleContinue}
              >
                Continue
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}

export default MealOrder;
