import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { api } from "../../scripts/Declarations";
import Loader from "../Loader/Loader";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function GenerateCodeForm({
  setShowRecoverPasswordForm,
  setShowVerifyCodeForm,
  phoneNumber,
  setPhoneNumber,
}) {
  const [showPhoneNumberErrorMessage, setshowPhoneNumberErrorMessage] =
    useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const body = {
    str: phoneNumber,
  };

  const handleSendVerificationCode = (event) => {
    event.preventDefault();

    api
      .post("/password-recovery/verify-phone-number", body)
      .then((response) => {
        if (response.data.status === 200) {
          const name = response.data.data;
          setshowPhoneNumberErrorMessage(false);
          setShowLoader(true);
          document.getElementById("send-code-button").classList.add("disabled");
          generateVerifciationCode(name);
        }
      })
      .catch(() => {
        setshowPhoneNumberErrorMessage(true);
      });
  };

  function generateVerifciationCode(name) {
    api
      .post("/password-recovery/generate-code", body)
      .then((response) => {
        sendCode(response.data.data.toString(), name);
      })
      .catch((error) => {
        console.error(error);
        document
          .getElementById("send-code-button")
          .classList.remove("disabled");
      });
  }

  function sendCode(code, personalName) {
    const body = {
      content: code,
      to: phoneNumber.slice(1),
      name: personalName,
    };
    api
      .post("whatsapp/send-code", body)
      .then(() => {
        setShowLoader(false);
        setShowRecoverPasswordForm(false);
        setShowVerifyCodeForm(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Box>
      <Typography>
        Enter your phone number to receive a verification code. You will need to
        check your phone for the code.
      </Typography>
      <Box component="form" onSubmit={handleSendVerificationCode}>
        <TextField
          className="mt-3"
          label="Phone Number"
          type="tel"
          variant="outlined"
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          helperText="Format: 05XXXXXXXX"
        />
        {showPhoneNumberErrorMessage && (
          <Typography color="error">
            * This phone number is not available.
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
            Send verification code
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default GenerateCodeForm;
