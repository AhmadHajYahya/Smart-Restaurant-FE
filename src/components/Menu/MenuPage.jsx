import React from "react";
import NavBar from "../NavBar/MainNavBar";
import Menu from "./Menu";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function MenuPage() {
  return (
    <div className="container-fluid p-0">
      <NavBar />
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" alignItems="center" my={4}>
          <Typography variant="h2" align="center">
            Discover Our Menu
          </Typography>
        </Box>
        <Menu />
      </Container>
    </div>
  );
}

export default MenuPage;
