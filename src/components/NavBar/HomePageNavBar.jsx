import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function HomePageNavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" sx={{ boxShadow: "none" }}>
        <Toolbar>
          <img
            src="/images/BurgerIcon.png"
            alt="Brand Icon"
            width="40"
            height="32"
            style={{ marginRight: "10px" }}
          />
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            Burger
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default HomePageNavBar;
