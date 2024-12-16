import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useData } from "../../DataContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { api, NIS } from "../../scripts/Declarations";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function CheckoutForm() {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { data, assignedTable, setMealOrderID, totalPrice } = useData();
  const { auth } = useAuth();
  const [name, setName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDialogOpen(true);
  };

  const handleDialogClose = (confirm) => {
    setDialogOpen(false);
    if (confirm) {
      processPayment();
    } else {
      navigate("/meal-order");
    }
  };

  const processPayment = async () => {
    const paymentIntentBody = {
      amount: 100 * totalPrice,
      currency: "ILS",
    };
    const {
      data: { clientSecret },
    } = await api.post("/payments/create-payment-intent", paymentIntentBody);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name,
        },
      },
    });

    if (result.error) {
      setPaymentMessage(result.error.message);
      setPaymentDialogOpen(true);
    } else {
      setPaymentMessage("Payment succeeded!");
      setPaymentDialogOpen(true);
      createOrder();
    }
  };

  const createOrder = () => {
    const mIds = data.map((item) => item.mealId);
    const body = {
      userId: auth.userData.userId,
      mealIds: mIds,
      tableId: assignedTable,
    };

    api
      .post(`/mealOrders/add`, body)
      .then((response) => {
        setMealOrderID(response.data.data.mOrderID);
        createReceipt(response.data.data.mOrderID);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const createReceipt = (mealOrderID) => {
    const body = {
      mealOrderId: mealOrderID,
    };
    api
      .post("/receipts/create-receipt", body)
      .then((response) => {
        const msgBody = {
          to: auth.userData.phoneNumber,
          content: response.data.data.receiptDoc,
          name: auth.userData.name,
        };
        api
          .post(`/whatsapp/send-receipt`, msgBody)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePaymentDialogClose = () => {
    setPaymentDialogOpen(false);
    if (paymentMessage === "Payment succeeded!") {
      if (auth.userData.role === "GUEST_USER") {
        navigate(`/in-restaurant`);
      } else {
        navigate("/meal-order/tracker");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component={Paper}
        className="p-4 my-4"
        elevation={3}
        style={{ backgroundColor: "#fff" }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Payment Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            className="mb-3"
            label="Name On Card"
            type="text"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Box className="mb-3 border p-3 rounded-1">
            <CardElement />
          </Box>
          <Button
            className="w-100 mb-3"
            variant="contained"
            color="primary"
            type="submit"
            disabled={!stripe}
          >
            Pay Now{" "}
            <span className="ms-2">
              {totalPrice} {NIS}
            </span>
          </Button>
        </form>
      </Box>

      <Dialog open={dialogOpen} onClose={() => handleDialogClose(false)}>
        <DialogTitle>Confirm Payment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can't cancel the order after paying!! Are you sure you want to
            proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleDialogClose(true)} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={paymentDialogOpen} onClose={handlePaymentDialogClose}>
        <DialogTitle>Payment Status</DialogTitle>
        <DialogContent>
          <DialogContentText>{paymentMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePaymentDialogClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CheckoutForm;
