import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { api } from "../../scripts/Declarations";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import FreeTable from "../AdminDashboard/ManageTables/FreeTable";
import NavBar from "../NavBar/MainNavBar";
import UpdateTable from "../AdminDashboard/ManageTables/UpdateTable";
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

function WaiterDashboard() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [parentValue, setParentValue] = useState(0);
  const [tablesValue, setTablesValue] = useState(0);
  const [ordersValue, setOrdersValue] = useState(0);

  const [tableData, setTableData] = useState([]);
  const [callWaiterData, setCallWaiterData] = useState([]);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    fetchInitialData();
  }, [parentValue, tablesValue, ordersValue]);

  useEffect(() => {
    const orderSource = new EventSource(
      `${
        process.env.REACT_APP_BASE_URL
      }/real-time/update/meal-orders?status=${getOrderStatus(ordersValue)}`,
      {
        withCredentials: true,
      }
    );

    orderSource.onmessage = function (event) {
      const data = JSON.parse(event.data);
      setOrderData(data.data); // Update order data
    };

    const waiterCallSource = new EventSource(
      `${process.env.REACT_APP_BASE_URL}/real-time/update/waiter-calls?waiterId=${auth.userData.userId}`,
      {
        withCredentials: true,
      }
    );

    waiterCallSource.onmessage = function (event) {
      const data = JSON.parse(event.data);
      setCallWaiterData(data.data); // Update call waiter data
    };

    return () => {
      orderSource.close();
      waiterCallSource.close();
    };
  }, [ordersValue]);

  const getOrderStatus = (value) => {
    switch (value) {
      case 0:
        return "ACCEPTED";
      case 1:
        return "PREPARING";
      case 2:
        return "READY";
      default:
        return "ACCEPTED";
    }
  };

  const fetchInitialData = () => {
    if (parentValue === 0) {
      fetchTablesData(tablesValue);
    } else if (parentValue === 1) {
      fetchOrdersData(ordersValue);
    }
  };

  const fetchTablesData = (value) => {
    if (value === 3) {
      fetchWaiterCallsData();
    } else {
      const taken = value === 0 ? false : true;
      api
        .get(`/tables/all?taken=${taken}`)
        .then((response) => {
          setTableData(response.data.data);
        })
        .catch((err) => {
          console.log(
            "Error fetching tables data:",
            err.response ? err.response.data.message : err.message
          );
        });
    }
  };

  const fetchWaiterCallsData = () => {
    api
      .get(`/call-waiter/get-calls?waiterId=${auth.userData.userId}`)
      .then((response) => {
        setCallWaiterData(response.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

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
      .get(`/mealOrders/all?status=${status}`)
      .then((response) => {
        setOrderData(response.data.data);
      })
      .catch((err) => {
        console.log(
          "Error fetching orders data:",
          err.response ? err.response.data.message : err.message
        );
      });
  };

  const handleParentChange = (event, newValue) => {
    setParentValue(newValue);
  };

  const handleTablesChange = (event, newValue) => {
    setTablesValue(newValue);
  };

  const handleOrdersChange = (event, newValue) => {
    setOrdersValue(newValue);
  };

  const handleAnsweredButton = (item) => {
    api
      .delete(`/call-waiter/delete-call?callId=${item.callWaiterId}`)
      .then(() => {
        fetchWaiterCallsData();
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const handleDoneButton = (order) => {
    api
      .put(`/mealOrders/update?orderId=${order.mOrderID}&status=DONE`, {})
      .then(() => {
        fetchOrdersData(ordersValue);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const renderCards = (type) => {
    let dataToRender;
    if (type === "table") {
      dataToRender = tableData;
    } else if (type === "calls") {
      dataToRender = callWaiterData;
    } else if (type === "order") {
      dataToRender = orderData;
    }

    return (
      <div className="row row-cols-md-2 row-cols-lg-4 g-4 p-3">
        {dataToRender.map((item, index) =>
          type === "table" ? (
            <Card className="col" key={index} sx={{ minWidth: 275 }}>
              <CardContent>
                <h5>Table {item.tableId}</h5>
                <hr />
                <h6>Seats number : {item.seats_number}</h6>
                <h6>Booked : {item.isBooked ? "Yes" : "No"}</h6>
                {item.isTaken ? <h6>Guest : {item.userId}</h6> : ""}
              </CardContent>
            </Card>
          ) : type === "calls" ? (
            <Card className="col" key={index} sx={{ minWidth: 275 }}>
              <CardContent>
                <h5>Table {item.tableId}</h5>
                <hr />
                <Button
                  onClick={() => handleAnsweredButton(item)}
                  style={{ width: "100%" }}
                  variant="contained"
                  color="success"
                >
                  Answered
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="col" key={index} sx={{ minWidth: 275 }}>
              <CardContent>
                <h5>Order {item.mOrderID}</h5>
                <hr />
                <h6>Table : {item.table.tableId}</h6>
                <h6>Time : {item.time}</h6>
                <h6>Guest : {item.user.username}</h6>
                <h6>Meals:</h6>
                <ul>
                  {item.meals.map((meal, index) => (
                    <li key={index}>{meal.title}</li>
                  ))}
                </ul>
                {item.status === "READY" && (
                  <Button
                    onClick={() => handleDoneButton(item)}
                    style={{ width: "100%" }}
                    variant="contained"
                    color="success"
                  >
                    Done
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        )}
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
          <Tab label="Show Tables" {...a11yProps(0, "parent")} />
          <Tab label="Show Orders" {...a11yProps(1, "parent")} />
        </Tabs>
      </div>

      <TabPanel value={parentValue} index={0}>
        <div style={{ height: "100vh", float: "left" }} className="bg-danger">
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tablesValue}
            onChange={handleTablesChange}
            aria-label="Show Tables Tab"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Show Available Tables" {...a11yProps(0, "tables")} />
            <Tab label="Show Taken Tables" {...a11yProps(1, "tables")} />
            <Tab label="Free Table" {...a11yProps(2, "tables")} />
            <Tab label="Waiter Calls" {...a11yProps(3, "tables")} />
            <Tab label="Assign Table" {...a11yProps(4, "tables")} />
          </Tabs>
        </div>
        <TabPanel value={tablesValue} index={0}>
          {renderCards("table")}
        </TabPanel>
        <TabPanel value={tablesValue} index={1}>
          {renderCards("table")}
        </TabPanel>
        <TabPanel value={tablesValue} index={2}>
          <FreeTable />
        </TabPanel>
        <TabPanel value={tablesValue} index={3}>
          {renderCards("calls")}
        </TabPanel>
        <TabPanel value={tablesValue} index={4}>
          <UpdateTable />
        </TabPanel>
      </TabPanel>

      <TabPanel value={parentValue} index={1}>
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
          {renderCards("order")}
        </TabPanel>
        <TabPanel value={ordersValue} index={1}>
          {renderCards("order")}
        </TabPanel>
        <TabPanel value={ordersValue} index={2}>
          {renderCards("order")}
        </TabPanel>
      </TabPanel>
    </div>
  );
}

export default WaiterDashboard;
