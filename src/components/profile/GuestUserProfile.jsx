import React from "react";
import { useAuth } from "../../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import NavBar from "../NavBar/MainNavBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./ProfileStyle.css";

function GuestUserProfile() {
  const navigate = useNavigate();
  const { auth, logout } = useAuth();
  const { name, phoneNumber } = auth.userData;

  return (
    <div>
      <NavBar />
      <Container maxWidth="lg" className="mt-3">
        <Grid container spacing={4} justifyContent="center">
          {/* User Data Card */}
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              className="user-data-card shadow position-relative rounded-4"
              elevation={3}
            >
              <Box className="pt-5 text-center">
                <PersonIcon className="person-icon border" fontSize="large" />
                <Typography variant="h4" className="mt-3">
                  {name}
                </Typography>
                <Typography variant="subtitle1" className="mt-3">
                  Guest
                </Typography>
              </Box>
              <Box className="mt-2 mx-5 p-3 border rounded-5">
                <Typography variant="body2" className="mb-1">
                  Phone Number
                </Typography>
                <Typography variant="h6">{phoneNumber}</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* In Restaurant and Sign Up */}
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              className=" p-5 rounded-4 shadow"
              elevation={3}
              style={{ backgroundColor: "#ffe599" }}
            >
              <Box
                className="my-card"
                onClick={() => navigate("/in-restaurant")}
              >
                In Restaurant
              </Box>
            </Paper>
            <Paper className="bg-white p-5 rounded-4 shadow mt-4" elevation={3}>
              <Typography variant="h5" className="text-center">
                Sign Up for more services
              </Typography>
              <Box className="text-center mt-4">
                <Typography variant="h6">
                  Click{" "}
                  <Link to="/sign-up" onClick={() => logout()}>
                    here
                  </Link>
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default GuestUserProfile;
