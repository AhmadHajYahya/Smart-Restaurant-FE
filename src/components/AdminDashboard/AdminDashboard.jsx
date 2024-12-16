import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AddTable from "./ManageTables/AddTable";
import ShowTable from "./ManageTables/ShowTable";
import DeleteTable from "./ManageTables/DeleteTable";
import ShowAllTables from "./ManageTables/ShowAllTables";
import UpdateTable from "./ManageTables/UpdateTable";
import ShowAllOrders from "./ManageOrders/ShowAllOrders";
import ShowOrder from "./ManageOrders/ShowOrder";
import UpdateOrderStatus from "./ManageOrders/UpdateOrderStatus";
import DeleteOrder from "./ManageOrders/DeleteOrder";
import ShowAllUsers from "./ManageUsers/ShowAllUsers";
import ShowUser from "./ManageUsers/ShowUser";
import AddStaffUser from "./ManageUsers/AddStaffUser";
import DeleteUser from "./ManageUsers/DeleteUser";
import Menu from "../Menu/Menu";
import ShowAllBookings from "./ManageBookings/ShowAllBookings";
import ShowBooking from "./ManageBookings/ShowBooking";
import DeleteBooking from "./ManageBookings/DeleteBooking";
import ShowMeals from "./ManageMenu/ShowMeals";
import ShowMeal from "./ManageMenu/ShowMeal";
import AddMeal from "./ManageMenu/AddMeal";
import UpdateMeal from "./ManageMenu/UpdateMeal";
import DeleteMeal from "./ManageMenu/DeleteMeal";
import FreeTable from "./ManageTables/FreeTable";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import NavBar from "../NavBar/MainNavBar";
import StatisticsPage from "../Features/StatisticsPage";
import Notifications from "./NotificationComponent/Notifications";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index, tabName) {
  return {
    id: `${tabName}-vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function AdminDashboard() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [parentValue, setParentValue] = useState(0);
  const [tablesValue, setTablesValue] = useState(0);
  const [ordersValue, setOrdersValue] = useState(0);
  const [bookingsValue, setBookingsValue] = useState(0);
  const [usersValue, setUsersValue] = useState(0);
  const [menuValue, setMenuValue] = useState(0);

  const handleParentChange = (event, newValue) => {
    setParentValue(newValue);
  };

  const handleOrdersChange = (event, newValue) => {
    setOrdersValue(newValue);
  };
  const handleTablesChange = (event, newValue) => {
    setTablesValue(newValue);
  };
  const handleBookingsChange = (event, newValue) => {
    setBookingsValue(newValue);
  };
  const handleUsersChange = (event, newValue) => {
    setUsersValue(newValue);
  };
  const handleMenuChange = (event, newValue) => {
    setMenuValue(newValue);
  };
  return (
    <div>
      <NavBar />
      <div style={{ height: "100vh", float: "left" }} className="bg-danger">
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={parentValue}
          onChange={handleParentChange}
          aria-label="Main tabs"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Manage Tables" {...a11yProps(0, "parent")} />
          <Tab label="Mange Orders" {...a11yProps(1, "parent")} />
          <Tab label="Manage Bookings" {...a11yProps(2, "parent")} />
          <Tab label="Manage Users" {...a11yProps(3, "parent")} />
          <Tab label="Manage Menu" {...a11yProps(4, "parent")} />
          <Tab label="Statistics" {...a11yProps(5, "parent")} />
          <Tab label="Notifiactions" {...a11yProps(6, "parent")} />
        </Tabs>
      </div>

      <TabPanel value={parentValue} index={0}>
        <div style={{ height: "100vh", float: "left" }} className="bg-danger">
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tablesValue}
            onChange={handleTablesChange}
            aria-label="Manage Tables Tab"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Add Table" {...a11yProps(0, "tables")} />
            <Tab label="Show Table" {...a11yProps(1, "tables")} />
            <Tab label="Free Table" {...a11yProps(2, "tables")} />
            <Tab label="Update Table" {...a11yProps(3, "tables")} />
            <Tab label="Delete Table" {...a11yProps(4, "tables")} />
            <Tab label="Show All Tables" {...a11yProps(5, "tables")} />
            <Tab label="Show Available Tables" {...a11yProps(6, "tables")} />
            <Tab label="Show Taken Tables" {...a11yProps(7, "tables")} />
          </Tabs>
        </div>
        <TabPanel value={tablesValue} index={0}>
          <AddTable />
        </TabPanel>
        <TabPanel value={tablesValue} index={1}>
          <ShowTable />
        </TabPanel>
        <TabPanel value={tablesValue} index={2}>
          <FreeTable />
        </TabPanel>
        <TabPanel value={tablesValue} index={3}>
          <UpdateTable />
        </TabPanel>
        <TabPanel value={tablesValue} index={4}>
          <DeleteTable />
        </TabPanel>
        <TabPanel value={tablesValue} index={5}>
          <ShowAllTables criteria={"all"} />
        </TabPanel>
        <TabPanel value={tablesValue} index={6}>
          <ShowAllTables criteria={"available"} />
        </TabPanel>
        <TabPanel value={tablesValue} index={7}>
          <ShowAllTables criteria={"taken"} />
        </TabPanel>
      </TabPanel>

      <TabPanel value={parentValue} index={1}>
        <div style={{ height: "100vh", float: "left" }} className="bg-danger">
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={ordersValue}
            onChange={handleOrdersChange}
            aria-label="Manage Orders Tab"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Show All Orders" {...a11yProps(0, "orders")} />
            <Tab label="Show Accepted Orders" {...a11yProps(1, "orders")} />
            <Tab label="Show Preparing Orders" {...a11yProps(2, "orders")} />
            <Tab label="Show Ready Orders" {...a11yProps(3, "orders")} />
            <Tab label="Show Order" {...a11yProps(4, "orders")} />
            <Tab label="Update Order Status" {...a11yProps(5, "orders")} />
            <Tab label="Delete Order" {...a11yProps(6, "orders")} />
          </Tabs>
        </div>
        <TabPanel value={ordersValue} index={0}>
          <ShowAllOrders criteria={"all"} />
        </TabPanel>
        <TabPanel value={ordersValue} index={1}>
          <ShowAllOrders criteria={"Accepted"} />
        </TabPanel>
        <TabPanel value={ordersValue} index={2}>
          <ShowAllOrders criteria={"Preparing"} />
        </TabPanel>
        <TabPanel value={ordersValue} index={3}>
          <ShowAllOrders criteria={"Ready"} />
        </TabPanel>
        <TabPanel value={ordersValue} index={4}>
          <ShowOrder />
        </TabPanel>
        <TabPanel value={ordersValue} index={5}>
          <UpdateOrderStatus />
        </TabPanel>
        <TabPanel value={ordersValue} index={6}>
          <DeleteOrder />
        </TabPanel>
      </TabPanel>

      <TabPanel value={parentValue} index={2}>
        <div style={{ height: "100vh", float: "left" }} className="bg-danger">
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={bookingsValue}
            onChange={handleBookingsChange}
            aria-label="Manage Bookings Tab"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Show All Bookings" {...a11yProps(0, "bookings")} />
            <Tab label="Show Booking" {...a11yProps(1, "bookings")} />
            <Tab label="Delete Booking" {...a11yProps(2, "bookings")} />
          </Tabs>
        </div>
        <TabPanel value={bookingsValue} index={0}>
          <ShowAllBookings />
        </TabPanel>
        <TabPanel value={bookingsValue} index={1}>
          <ShowBooking />
        </TabPanel>
        <TabPanel value={bookingsValue} index={2}>
          <DeleteBooking />
        </TabPanel>
      </TabPanel>

      <TabPanel value={parentValue} index={3}>
        <div style={{ height: "100vh", float: "left" }} className="bg-danger">
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={usersValue}
            onChange={handleUsersChange}
            aria-label="Manage Users Tab"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Show All Users" {...a11yProps(0, "users")} />
            <Tab label="Show All Guest Users" {...a11yProps(1, "users")} />
            <Tab label="Show All Registered Users" {...a11yProps(2, "users")} />
            <Tab label="Show All Cooks" {...a11yProps(3, "users")} />
            <Tab label="Show All Waiters" {...a11yProps(4, "users")} />
            <Tab label="Show All Admins" {...a11yProps(5, "users")} />
            <Tab label="Show User" {...a11yProps(6, "users")} />
            <Tab label="Add Staff User" {...a11yProps(7, "users")} />
            <Tab label="Delete User" {...a11yProps(8, "users")} />
          </Tabs>
        </div>
        <TabPanel value={usersValue} index={0}>
          <ShowAllUsers type={"all"} />
        </TabPanel>
        <TabPanel value={usersValue} index={1}>
          <ShowAllUsers type={"guest"} />
        </TabPanel>
        <TabPanel value={usersValue} index={2}>
          <ShowAllUsers type={"registered"} />
        </TabPanel>
        <TabPanel value={usersValue} index={3}>
          <ShowAllUsers type={"cook"} />
        </TabPanel>
        <TabPanel value={usersValue} index={4}>
          <ShowAllUsers type={"waiter"} />
        </TabPanel>
        <TabPanel value={usersValue} index={5}>
          <ShowAllUsers type={"admin"} />
        </TabPanel>
        <TabPanel value={usersValue} index={6}>
          <ShowUser />
        </TabPanel>
        <TabPanel value={usersValue} index={7}>
          <AddStaffUser />
        </TabPanel>
        <TabPanel value={usersValue} index={8}>
          <DeleteUser />
        </TabPanel>
      </TabPanel>
      <TabPanel value={parentValue} index={4}>
        <div style={{ height: "100vh", float: "left" }} className="bg-danger">
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={menuValue}
            onChange={handleMenuChange}
            aria-label="Manage Menu Tab"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Show Menu" {...a11yProps(0, "menu")} />
            <Tab label="Show Available Meals" {...a11yProps(1, "menu")} />
            <Tab label="Show Unavailable Meals" {...a11yProps(2, "menu")} />
            <Tab label="Show Meal" {...a11yProps(3, "menu")} />
            <Tab label="Add Meal" {...a11yProps(4, "menu")} />
            <Tab label="Update Meal" {...a11yProps(5, "menu")} />
            <Tab label="Delete Meal" {...a11yProps(6, "menu")} />
          </Tabs>
        </div>
        <TabPanel value={menuValue} index={0}>
          <div style={{ display: "flow-root", padding: "10px" }}>
            <Menu />
          </div>
        </TabPanel>
        <TabPanel value={menuValue} index={1}>
          <ShowMeals />
        </TabPanel>
        <TabPanel value={menuValue} index={2}>
          <ShowMeals available={false} />
        </TabPanel>
        <TabPanel value={menuValue} index={3}>
          <ShowMeal />
        </TabPanel>
        <TabPanel value={menuValue} index={4}>
          <AddMeal />
        </TabPanel>
        <TabPanel value={menuValue} index={5}>
          <UpdateMeal />
        </TabPanel>
        <TabPanel value={menuValue} index={6}>
          <DeleteMeal />
        </TabPanel>
      </TabPanel>
      <TabPanel value={parentValue} index={5}>
        <StatisticsPage />
      </TabPanel>
      <TabPanel value={parentValue} index={6}>
        <Notifications />
      </TabPanel>
    </div>
  );
}

export default AdminDashboard;
