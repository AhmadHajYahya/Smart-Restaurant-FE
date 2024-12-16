import React, { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import { useData } from "../../DataContext";
import { useNavigate } from "react-router-dom";
import { api } from "../../scripts/Declarations";
import RateMeal from "../Features/RateMeal";
import NavBar from "../NavBar/MainNavBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./ProfileStyle.css";

function InRestaurant() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { assignedTable, setAssignedTable, mealOrderID, setMealOrderID } =
    useData();
  const [showRatingMealModal, setshowRatingMealModal] = useState(false);

  useEffect(() => {
    api
      .get(`/tables/tableId?userId=${auth.userData.userId}`)
      .then((response) => {
        setAssignedTable(response.data.data);
      })
      .catch((err) => {});
  }, []);
  useEffect(() => {
    api
      .get(`/mealOrders/mealOrder?userId=${auth.userData.userId}`)
      .then((response) => {
        setMealOrderID(response.data.data.mOrderID);
      })
      .catch((err) => {});
  }, []);
  const callWaiter = () => {
    api
      .get(`/call-waiter/create-call?tableId=${assignedTable}`)
      .then((response) => {
        alert(response.data.message);
        console.log(1);
        console.log(response.data);
      })
      .catch((err) => {
        //alert(err.response.data.message);
        console.log(2);
        console.log(err);
      });
  };

  const freeTable = () => {
    api
      .put(`/tables/free-table?tableId=${assignedTable}`)
      .then((response) => {
        setAssignedTable("");
        if (auth.userData.role === "REGISTERED_USER")
          setshowRatingMealModal(true);
        alert(response.data.message);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="lg" className="mt-3">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Paper className="rounded-4 shadow p-3 mb-3" elevation={3}>
              <Box display="flex" flexDirection="column" alignItems="start">
                <Typography variant="h5">
                  Your table is: {assignedTable}
                </Typography>
              </Box>
            </Paper>
            <Paper className="rounded-4 shadow p-3 mb-3" elevation={3}>
              <Box display="flex" flexDirection="column" alignItems="start">
                <Typography variant="h5">
                  Your current order: {mealOrderID}
                </Typography>
              </Box>
            </Paper>
            <Paper className="rounded-4 shadow p-5" elevation={3}>
              <Grid container spacing={2}>
                {!assignedTable && (
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => navigate("/take-table")}
                      className="my-card"
                    >
                      Have a seat!
                    </Button>
                  </Grid>
                )}
                {assignedTable && (
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => navigate("/meal-order")}
                      className="my-card"
                    >
                      Make An Order
                    </Button>
                  </Grid>
                )}
                {assignedTable && (
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="warning"
                      fullWidth
                      onClick={callWaiter}
                      className="my-card"
                    >
                      Call Waiter
                    </Button>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="info"
                    fullWidth
                    onClick={() => navigate("/menu")}
                    className="my-card"
                  >
                    Menu
                  </Button>
                </Grid>
                {assignedTable && (
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="error"
                      fullWidth
                      onClick={freeTable}
                      className="my-card"
                    >
                      Free Table
                    </Button>
                  </Grid>
                )}
                {mealOrderID && auth.userData.role === "REGISTERED_USER" && (
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="success"
                      fullWidth
                      onClick={() => navigate("/meal-order/tracker")}
                      className="my-card"
                    >
                      Track Your Order
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <RateMeal
        showRatingMealModal={showRatingMealModal}
        setshowRatingMealModal={setshowRatingMealModal}
      />
    </div>
  );
}

export default InRestaurant;
