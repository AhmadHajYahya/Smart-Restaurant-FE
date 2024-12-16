import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../../AuthContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { api } from "../../scripts/Declarations";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      username: formData.username,
      password: formData.password,
    };

    api
      .post(`/users/login`, body)
      .then((response) => {
        const userData = response.data.data;

        login(userData);

        // Navigate to the Profile page
        if (
          userData.role === "ADMIN" ||
          userData.role === "COOK" ||
          userData.role === "WAITER"
        ) {
          navigate(`/staff-profile/${userData.userId}`);
        } else {
          navigate(`/profile/${userData.userId}`);
        }
      })
      .catch((error) => alert(error.response.data.message));
  };

  return (
    <Container component="main" maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className="vh-100"
      >
        <Grid item xs={12} md={6}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 5,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "#fffaf0", // Suitable background color for the form
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              className="text-center mb-4"
            >
              Sign In
            </Typography>
            <TextField
              className="mb-3"
              label="Username"
              type="text"
              variant="outlined"
              fullWidth
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
            <TextField
              className="mb-3"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4 "
            >
              Submit
            </Button>
            <Typography variant="body2" className="mt-4">
              Forgot Password? <Link to="/password-recovery">Click here</Link>
            </Typography>
            <Box className="text-center mt-2" sx={{ width: "100%" }}>
              <Box className="d-flex align-items-center mb-3">
                <hr className="w-50 me-3" />
                Or
                <hr className="w-50 ms-3" />
              </Box>
              <Typography variant="body2">
                Sign up <Link to="/sign-up">here</Link>
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "block", md: "none" },
              borderRadius: "15px",
              overflow: "hidden",
              mt: 4,
            }}
          >
            <img
              src="/images/HomeImage.png"
              alt=""
              style={{ width: "100%", height: "auto", borderRadius: "15px" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
          <img
            src="/images/HomeImage.png"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "15px",
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignIn;
