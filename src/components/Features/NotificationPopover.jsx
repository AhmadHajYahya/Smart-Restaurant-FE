import React, { useState, useEffect } from "react";
import {
  Badge,
  Popover,
  Card,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { api } from "../../scripts/Declarations";

const NotificationPopover = ({ alerts }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const handleAlertClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleTitleClick = (alert) => {
    setSelectedAlert(alert);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedAlert(null);
  };

  const isToday = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const open = Boolean(anchorEl);
  const id = open ? "alerts-popover" : undefined;

  return (
    <div style={{ top: "2%", right: "5%", position: "absolute" }}>
      <Badge badgeContent={alerts.length} color="primary">
        <NotificationsIcon
          aria-describedby={id}
          onClick={handleAlertClick}
          style={{ cursor: "pointer" }}
        />
      </Badge>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{ width: 320 }}
      >
        {[...alerts].reverse().map((alert, index) => (
          <Card
            key={index}
            sx={{
              margin: 1,
              maxWidth: 300,
              "&:hover": {
                backgroundColor: "#e7e9ea",
              },
            }}
          >
            <CardContent>
              <Typography
                variant="body1"
                onClick={() => handleTitleClick(alert)}
                sx={{
                  cursor: "pointer",
                  userSelect: "none",
                  padding: "4px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <span>{alert.notificationTitle}</span>
                <span
                  style={{
                    marginLeft: "8px",
                    fontSize: "0.8em",
                    color: "gray",
                  }}
                >
                  {isToday(alert.date) ? alert.time : alert.date}
                </span>
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Popover>
      <Dialog open={modalOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedAlert?.notificationTitle}</DialogTitle>
        <DialogContent dividers>
          <Typography sx={{ wordWrap: "break-word", marginBottom: "10px" }}>
            {selectedAlert?.notificationContent}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {selectedAlert?.date} {selectedAlert?.time}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NotificationPopover;
