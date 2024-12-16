import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { api } from "../../../scripts/Declarations";

const Notifications = () => {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [succeeded, setSucceeded] = useState(false);

  const sendAlert = (event) => {
    event.preventDefault();
    if (title !== "" || message !== "") {
      setSucceeded(false);
      const body = {
        notificationTitle: title,
        notificationContent: message,
      };

      console.log("Alert sending started");
      api
        .post(`/notifications/send-notification`, body) // Corrected line
        .then((response) => {
          console.log("Alert sent");
          setMessage("");
          setTitle("");
          setSucceeded(true);
        })
        .catch((error) => {
          console.error("Error sending alert", error);
        });
    }
  };

  return (
    <div style={{ display: "flow-root" }}>
      <div className="d-flex justify-content-center mt-4">
        <h1>Send A Notification</h1>
      </div>
      <hr />
      <form onSubmit={sendAlert} className="mt-5 w-50  mx-auto">
        <div className="mb-3">
          <TextField
            label="Notification Title"
            type="text"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-3"
            required
          />
          <TextField
            label="Notification content"
            type="outlined-multiline-static"
            variant="outlined"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            multiline
            required
          />
        </div>
        <Button
          className="w-100 mt-5"
          type="submit"
          variant="contained"
          color="primary"
        >
          Send
        </Button>
      </form>
      <hr />
      {succeeded && (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <div className=" bg-white p-4 rounded-4 shadow w-50">
            <div className="d-flex justify-content-center align-items-center">
              <h3 style={{ color: "green" }}>
                Notification Sent Successfully.
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
