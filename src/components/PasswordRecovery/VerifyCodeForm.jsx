import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { api } from "../../scripts/Declarations";
import Loader from "../Loader/Loader";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function VerifyCodeForm({
  setShowRecoverPasswordForm,
  setShowVerifyCodeForm,
  phoneNumber,
  setShowSetNewPasswordForm,
}) {
  const [userCode, setUserCode] = useState("");
  const [showCodeErrorMessage, setShowCodeErrorMessage] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [seconds, setSeconds] = useState(30);

  const handleVerifyCode = (event) => {
    event.preventDefault();
    setShowLoader(true);
    const body = {
      userCode: userCode,
      phoneNumber: phoneNumber,
    };
    api
      .post("/password-recovery/verify-code", body)
      .then(() => {
        setShowCodeErrorMessage(false);
        setShowLoader(false);
        setShowVerifyCodeForm(false);
        setShowRecoverPasswordForm(false);
        setShowSetNewPasswordForm(true);
      })
      .catch(() => {
        setShowCodeErrorMessage(true);
        setShowLoader(false);
      });
  };

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [seconds]);

  return (
    <Box>
      <Typography>Enter the verification code you received here:</Typography>
      <Box component="form" onSubmit={handleVerifyCode}>
        <TextField
          className="mt-3"
          label="Verification Code"
          type="tel"
          variant="outlined"
          fullWidth
          value={userCode}
          onChange={(e) => {
            if (e.target.value.length <= 6) setUserCode(e.target.value);
          }}
          required
          helperText="Format: XXXXXX"
        />
        {showCodeErrorMessage && (
          <Typography color="error">
            * The verification code is wrong.
          </Typography>
        )}

        {showLoader && (
          <Box className="d-flex justify-content-center">
            <Loader />
          </Box>
        )}
        <Box className="mt-3 d-flex">
          <Typography>
            Didn't receive code? try again after :{" "}
            {seconds !== 0 ? (
              `${seconds}s`
            ) : (
              <Button
                variant="contained"
                style={{ fontSize: "12px", backgroundColor: "#f4b91a" }}
                onClick={() => {
                  setShowRecoverPasswordForm(true);
                  setShowVerifyCodeForm(false);
                }}
              >
                Try Again
              </Button>
            )}
          </Typography>
        </Box>

        <Box className="d-flex justify-content-center align-items-center mt-4">
          <Button
            id="submit-code-button"
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Verify Code
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default VerifyCodeForm;
