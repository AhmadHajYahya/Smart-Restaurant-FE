import React, { useState } from "react";
import GenerateCodeForm from "./GenerateCodeForm";
import VerifyCodeForm from "./VerifyCodeForm";
import SetNewPasswordForm from "./SetNewPasswordForm";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function PasswordRecovery() {
  const [showRecoverPasswordForm, setShowRecoverPasswordForm] = useState(true);
  const [showVerifyCodeForm, setShowVerifyCodeForm] = useState(false);
  const [showSetNewPasswordForm, setShowSetNewPasswordForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <Container component="main" maxWidth="sm">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className="vh-100"
      >
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 5,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "#fffaf0",
            }}
          >
            <Typography
              component="h3"
              variant="h5"
              className="text-center mb-4"
            >
              Recover Password
            </Typography>
            <hr />

            {showRecoverPasswordForm && (
              <GenerateCodeForm
                setShowRecoverPasswordForm={setShowRecoverPasswordForm}
                setShowVerifyCodeForm={setShowVerifyCodeForm}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
              />
            )}
            {showVerifyCodeForm && (
              <VerifyCodeForm
                setShowRecoverPasswordForm={setShowRecoverPasswordForm}
                setShowVerifyCodeForm={setShowVerifyCodeForm}
                setShowSetNewPasswordForm={setShowSetNewPasswordForm}
                phoneNumber={phoneNumber}
              />
            )}
            {showSetNewPasswordForm && (
              <SetNewPasswordForm phoneNumber={phoneNumber} />
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PasswordRecovery;
