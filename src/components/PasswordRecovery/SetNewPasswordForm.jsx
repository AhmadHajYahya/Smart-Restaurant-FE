import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { api } from "../../scripts/Declarations";
import Loader from "../Loader/Loader";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function SetNewPasswordForm({ phoneNumber }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [showPasswordErrorMessage, setShowPasswordErrorMessage] =
    useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (passwordAgain !== password) {
      setShowPasswordErrorMessage(true);
    } else if (password === "" && passwordAgain === "") {
      setShowPasswordErrorMessage(false);
    } else {
      setShowPasswordErrorMessage(false);
    }
  }, [password, passwordAgain]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowLoader(true);
    const body = {
      phoneNumber: phoneNumber,
      password: password,
    };

    api
      .put(`/password-recovery/set-new-password`, body)
      .then(() => {
        setShowLoader(false);
        let r = confirm("Password Recovered Successfully.");
        if (r) {
          navigate("/sign-in");
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <Box>
      <Typography>Enter your new password:</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          className="mt-3"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          className="mt-3"
          label="Password Again"
          type="password"
          variant="outlined"
          fullWidth
          value={passwordAgain}
          onChange={(e) => setPasswordAgain(e.target.value)}
          required
        />
        {showPasswordErrorMessage && (
          <Typography color="error">
            * The two passwords are not matching.
          </Typography>
        )}

        {showLoader && (
          <Box className="d-flex justify-content-center">
            <Loader />
          </Box>
        )}
        <Box className="d-flex justify-content-center align-items-center mt-4">
          <Button
            id="send-code-button"
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SetNewPasswordForm;
