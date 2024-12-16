import React, { useState, useEffect } from "react";
import { api } from "../../../scripts/Declarations";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function ShowAllTables({ criteria }) {
  const [tablesData, setTablesData] = useState([]);

  useEffect(() => {
    let url;
    if (criteria === "all") {
      url = `/tables/all`;
    } else if (criteria === "available") {
      url = `/tables/all?taken=false`;
    } else if (criteria === "taken") {
      url = `/tables/all?taken=true`;
    }

    api
      .get(url)
      .then((response) => {
        setTablesData(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  return (
    <div>
      {tablesData.length === 0 ? (
        <div className="text-center">
          <h4>No {criteria === "all" ? "" : criteria} tables</h4>
        </div>
      ) : (
        <div className="row  row-cols-md-2 row-cols-lg-4 g-4 p-3">
          {tablesData.map((item, index) => (
            <Card className="col" key={index} sx={{ minWidth: 275 }}>
              <CardContent>
                <h5>Table {item.tableId}</h5>
                <hr />
                <h6>Seats number : {item.seats_number}</h6>
                <h6>Booked : {item.isBooked ? "Yes" : "No"}</h6>
                <h6>Taken : {item.isTaken ? "Yes" : "No"}</h6>
                {item.isTaken ? <h6>Guest : {item.userId}</h6> : ""}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowAllTables;
