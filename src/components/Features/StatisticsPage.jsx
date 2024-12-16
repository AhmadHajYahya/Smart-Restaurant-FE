import React, { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import { api, NIS } from "../../scripts/Declarations";
import {
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  People,
  Person,
  Restaurant,
  TableBar,
  LocalDining,
  ShoppingCart,
  EventSeat,
  AttachMoney,
} from "@mui/icons-material";
import MealCard from "./MCard"; // Import the MealCard component

const StatisticsPage = () => {
  const { auth } = useAuth();
  const [allUsersNumber, setAllUsersNumber] = useState(0);
  const [allGuestUsersNumber, setAllGuestUsersNumber] = useState(0);
  const [allRegisteredUsersNumber, setAllRegisteredUsersNumber] = useState(0);
  const [allCooksNumber, setAllCooksNumber] = useState(0);
  const [allWaitersNumber, setAllWaitersNumber] = useState(0);
  const [allTablesNumber, setAllTablesNumber] = useState(0);
  const [allMealsNumber, setAllMealsNumber] = useState(0);
  const [topThreeMeals, setTopThreeMeals] = useState([]);
  const [allOrdersNumber, setAllOrdersNumber] = useState(0);
  const [thisMonthOrdersNumber, setThisMonthOrdersNumber] = useState(0);
  const [allBookingsNumber, setAllBookingsNumber] = useState(0);
  const [thisMonthBookingsNumber, setThisMonthBookingsNumber] = useState(0);
  const [thisMonthIncome, setThisMonthIncome] = useState(0);

  useEffect(() => {
    api.get("/smart-restaurant/admin/statistics").then((response) => {
      const data = response.data.data;
      console.log(data);
      setAllUsersNumber(data.allUsersNumber ?? 0);
      setAllGuestUsersNumber(data.allGuestUsersNumber ?? 0);
      setAllRegisteredUsersNumber(data.allRegisteredUsersNumber ?? 0);
      setAllCooksNumber(data.allCooksNumber ?? 0);
      setAllWaitersNumber(data.allWaitersNumber ?? 0);
      setAllTablesNumber(data.allTablesNumber ?? 0);
      setAllMealsNumber(data.allMealsNumber ?? 0);
      setTopThreeMeals(data.topThreeMeals ?? []);
      setAllOrdersNumber(data.allOrdersNumber ?? 0);
      setThisMonthOrdersNumber(data.thisMonthOrdersNumber ?? 0);
      setAllBookingsNumber(data.allBookingsNumber ?? 0);
      setThisMonthBookingsNumber(data.thisMonthBookingsNumber ?? 0);
      setThisMonthIncome(data.thisMonthIncome ?? 0);
    });
    const eventSource = new EventSource(
      `${process.env.REACT_APP_BASE_URL}/real-time/update/statistics`,
      {
        withCredentials: true,
      }
    );

    eventSource.onmessage = function (event) {
      const response = JSON.parse(event.data);
      if (response.status === 200 && response.data) {
        const data = response.data;
        setAllUsersNumber(data.allUsersNumber ?? 0);
        setAllGuestUsersNumber(data.allGuestUsersNumber ?? 0);
        setAllRegisteredUsersNumber(data.allRegisteredUsersNumber ?? 0);
        setAllCooksNumber(data.allCooksNumber ?? 0);
        setAllWaitersNumber(data.allWaitersNumber ?? 0);
        setAllTablesNumber(data.allTablesNumber ?? 0);
        setAllMealsNumber(data.allMealsNumber ?? 0);
        setTopThreeMeals(data.topThreeMeals ?? []);
        setAllOrdersNumber(data.allOrdersNumber ?? 0);
        setThisMonthOrdersNumber(data.thisMonthOrdersNumber ?? 0);
        setAllBookingsNumber(data.allBookingsNumber ?? 0);
        setThisMonthBookingsNumber(data.thisMonthBookingsNumber ?? 0);
        setThisMonthIncome(data.thisMonthIncome ?? 0);
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const StatItem = ({ icon, primary, secondary }) => (
    <ListItem>
      {icon}
      <ListItemText primary={primary} secondary={secondary} sx={{ ml: 2 }} />
    </ListItem>
  );

  return (
    <div style={{ display: "flow-root", padding: "10px" }}>
      <div className="d-flex justify-content-center my-3">
        <Typography variant="h4" gutterBottom>
          Restaurant Statistics
        </Typography>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              User Statistics
            </Typography>
            <List>
              <StatItem
                icon={<People color="primary" />}
                primary="Total Users"
                secondary={allUsersNumber}
              />
              <Divider variant="inset" component="li" />
              <StatItem
                icon={<Person color="secondary" />}
                primary="Guest Users"
                secondary={allGuestUsersNumber}
              />
              <Divider variant="inset" component="li" />
              <StatItem
                icon={<Person color="success" />}
                primary="Registered Users"
                secondary={allRegisteredUsersNumber}
              />
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Staff and Resources
            </Typography>
            <List>
              <StatItem
                icon={<Restaurant color="primary" />}
                primary="Cooks"
                secondary={allCooksNumber}
              />
              <Divider variant="inset" component="li" />
              <StatItem
                icon={<Person color="secondary" />}
                primary="Waiters"
                secondary={allWaitersNumber}
              />
              <Divider variant="inset" component="li" />
              <StatItem
                icon={<TableBar color="success" />}
                primary="Tables"
                secondary={allTablesNumber}
              />
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Menu and Orders
            </Typography>
            <List>
              <StatItem
                icon={<LocalDining color="primary" />}
                primary="Total Meals"
                secondary={allMealsNumber}
              />
              <Divider variant="inset" component="li" />
              <StatItem
                icon={<ShoppingCart color="secondary" />}
                primary="Total Orders"
                secondary={allOrdersNumber}
              />
              <Divider variant="inset" component="li" />
              <StatItem
                icon={<ShoppingCart color="success" />}
                primary="This Month's Orders"
                secondary={thisMonthOrdersNumber}
              />
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Bookings
            </Typography>
            <List>
              <StatItem
                icon={<EventSeat color="primary" />}
                primary="Total Bookings"
                secondary={allBookingsNumber}
              />
              <Divider variant="inset" component="li" />
              <StatItem
                icon={<EventSeat color="secondary" />}
                primary="This Month's Bookings"
                secondary={thisMonthBookingsNumber}
              />
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Financial
            </Typography>
            <List>
              <StatItem
                icon={<AttachMoney color="primary" />}
                primary="This Month's Income"
                secondary={`${NIS}${thisMonthIncome}`}
              />
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Top Three Meals
            </Typography>
            {topThreeMeals.length > 0 ? (
              topThreeMeals.map((meal) => (
                <MealCard key={meal.mealId} meal={meal} />
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No top meals available.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default StatisticsPage;
