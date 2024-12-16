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

function Registration() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [isGuest, setIsGuest] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = isGuest
      ? {
          username: "",
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          role: "GUEST_USER",
        }
      : {
          username: formData.username,
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          role: "REGISTERED_USER",
          password: formData.password,
          email: formData.email,
        };

    api
      .post(`/users/${isGuest ? "guest" : "register"}`, body)
      .then((response) => {
        alert(response.data.message);
        const userData = response.data.data;

        login(userData);
        if (userData.role === "REGISTERED_USER") {
          navigate(`/profile/${userData.userId}`);
        } else {
          navigate(`/guest-profile/${userData.userId}`);
        }
      })
      .catch((error) => alert(error.response.data.message));
  };

  const handleGuest = (e) => {
    e.preventDefault();
    setIsGuest(true);
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
              {isGuest ? "Continue As Guest" : "Sign Up"}
            </Typography>
            {!isGuest && (
              <>
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
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
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
              </>
            )}
            <TextField
              className="mb-3"
              label="Personal Name"
              type="text"
              variant="outlined"
              fullWidth
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <TextField
              className="mb-3"
              label="Phone Number"
              type="tel"
              variant="outlined"
              fullWidth
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              required
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
            >
              Submit
            </Button>

            {!isGuest ? (
              <Box className="text-center mt-2" sx={{ width: "100%" }}>
                <Box className="d-flex align-items-center mb-3">
                  <hr className="w-50 me-3" />
                  Or
                  <hr className="w-50 ms-3" />
                </Box>
                <Typography variant="body2">
                  Continue as guest{" "}
                  <Link to="#" onClick={handleGuest}>
                    here
                  </Link>
                </Typography>
              </Box>
            ) : (
              <Box className="text-center mt-2" sx={{ width: "100%" }}>
                <Box className="d-flex align-items-center mb-3">
                  <hr className="w-50 me-3" />
                  Or
                  <hr className="w-50 ms-3" />
                </Box>
                <Typography variant="body2">
                  Sign up{" "}
                  <Link to="/sign-up" onClick={() => setIsGuest(false)}>
                    here
                  </Link>
                </Typography>
              </Box>
            )}

            <hr />
            <Box className="text-center mt-2">
              <Typography variant="body2">
                Already Registered? <Link to={"/sign-in"}>Sign In</Link>
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

export default Registration;
