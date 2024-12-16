import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { api } from "../../scripts/Declarations";
import NavBar from "../NavBar/MainNavBar";

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
function CookDashboard() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [parentValue, setParentValue] = useState(0);
  const [ordersValue, setOrdersValue] = useState(0);
  const [data, setData] = useState([]);

  const handleParentChange = (event, newValue) => {
    setParentValue(newValue);
  };

  const handleOrdersChange = (event, newValue) => {
    setOrdersValue(newValue);
    fetchOrdersData(newValue);
  };

  useEffect(() => {
    if (ordersValue === 0) {
      const eventSource = new EventSource(
        `${process.env.REACT_APP_BASE_URL}/real-time/update/prioritized-orders?status=ACCEPTED`,
        {
          withCredentials: true,
        }
      );

      eventSource.onmessage = (event) => {
        const newData = JSON.parse(event.data);
        setData(newData.data); // Update state with new data
      };

      eventSource.onerror = (error) => {
        eventSource.close(); // Optionally close on error
      };

      return () => {
        eventSource.close();
      };
    }
  }, [ordersValue]);

  useEffect(() => {
    fetchOrdersData(ordersValue);
  }, []);

  const fetchOrdersData = (value) => {
    let status;
    if (value === 0) {
      status = "ACCEPTED";
    } else if (value === 1) {
      status = "PREPARING";
    } else if (value === 2) {
      status = "READY";
    }
    api
      .get(`/mealOrders/prioritized-orders?status=${status}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((err) => {
        console.log(
          "Error fetching orders data:",
          err.response ? err.response.data.message : err.message
        );
      });
  };

  const handleStatusButton = (order, status) => {
    api
      .put(`/mealOrders/update?orderId=${order.mOrderID}&status=${status}`)
      .then(() => {
        fetchOrdersData(ordersValue);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const renderCards = () => {
    return (
      <div className="row  row-cols-md-2 row-cols-lg-4 g-4 p-3">
        {data.map((item, index) => (
          <Card className="col" key={index} sx={{ minWidth: 275 }}>
            <CardContent>
              <h5>Order {item.mOrderID}</h5>
              <hr />
              <h6>Table : {item.table.tableId}</h6>
              <h6>Time : {item.time}</h6>
              <h6>Guest : {item.user.name}</h6>
              <h6>Meals:</h6>
              <ul>
                {item.meals.map((meal, index) => (
                  <li key={index}>{meal.title}</li>
                ))}
              </ul>
              {item.status === "ACCEPTED" && (
                <Button
                  onClick={() => handleStatusButton(item, "PREPARING")}
                  style={{ width: "100%" }}
                  variant="contained"
                  color="primary"
                >
                  Prepare
                </Button>
              )}
              {item.status === "PREPARING" && (
                <Button
                  onClick={() => handleStatusButton(item, "READY")}
                  style={{ width: "100%" }}
                  variant="contained"
                  color="warning"
                >
                  Ready
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
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
          <Tab label="Show Orders" {...a11yProps(1, "parent")} />
        </Tabs>
      </div>

      <TabPanel value={parentValue} index={0}>
        <div style={{ height: "100vh", float: "left" }} className="bg-danger">
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={ordersValue}
            onChange={handleOrdersChange}
            aria-label="Show Orders Tab"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Show Accepted Orders" {...a11yProps(0, "orders")} />
            <Tab label="Show Preparing Orders" {...a11yProps(1, "orders")} />
            <Tab label="Show Ready Orders" {...a11yProps(2, "orders")} />
          </Tabs>
        </div>
        <TabPanel value={ordersValue} index={0}>
          {renderCards()}
        </TabPanel>
        <TabPanel value={ordersValue} index={1}>
          {renderCards()}
        </TabPanel>
        <TabPanel value={ordersValue} index={2}>
          {renderCards()}
        </TabPanel>
      </TabPanel>
    </div>
  );
}

export default CookDashboard;
