import React from "react";
import HomePageNavBar from "../NavBar/HomePageNavBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import ContactUs from "./ContactUs";
import About from "./About";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Zoom from "@mui/material/Zoom";

import "./HomePageStyle.css";

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#home"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

function HomePage(props) {
  const { auth } = useAuth();
  let navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  function handleClick() {
    if (auth.userData) {
      if (auth.userData.role === "REGISTERED_USER")
        navigate(`/profile/${auth.userData.userId}`);
      else if (auth.userData.role === "GUEST_USER") {
        navigate(`/guest-profile/${auth.userData.userId}`);
      } else {
        navigate(`/staff-profile/${auth.userData.userId}`);
      }
    } else {
      navigate("/sign-in");
    }
  }

  return (
    <div className="main-page">
      <HomePageNavBar />
      <Box className="accesories right-rectangle"></Box>
      <Box className="accesories top-rectangle"></Box>
      <Box className="accesories three-dots">
        <img className="img-fluid" src="/images/3Dots.png" alt="" />
      </Box>
      <Container maxWidth="lg" id="home" className="p-0">
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              className="content"
              mt={5}
              textAlign={matches ? "left" : "center"}
            >
              <Typography
                variant="h1"
                component="h1"
                className="fw-bold mb-3 home-title"
              >
                TASTE OUR <br /> BURGERS
              </Typography>
              <Typography
                variant="h3"
                component="h3"
                className="mb-3 home-subtitle"
              >
                The Best Burgers
              </Typography>
              <Typography
                variant="body1"
                className="fw-bold mb-4 mb-lg-0 w-100 w-lg-75 home-text"
              >
                At Burger, we pride ourselves on serving the juiciest, most
                delicious burgers in town. Our commitment to quality ingredients
                and exceptional service ensures that every meal is a memorable
                experience.
              </Typography>
              <Button
                onClick={handleClick}
                className="mt-5 w-100 w-lg-75 btn"
                variant="contained"
                color="primary"
              >
                Discover Our Restaurant
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} className="d-flex justify-content-center">
            <img
              className="home-image rounded-circle"
              src="/images/HomeImage.png"
              alt="Burger Home Image"
            />
          </Grid>
        </Grid>
      </Container>
      <Box mt={10} />
      <About />
      <Box mt={5} />
      <ContactUs />
      <ScrollTop {...props}>
        <Fab
          sx={{
            backgroundColor: "#f4831a",
            "&:hover": { backgroundColor: "#ff9633" },
          }}
          size="small"
          aria-label="scroll back to top"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </div>
  );
}

export default HomePage;
