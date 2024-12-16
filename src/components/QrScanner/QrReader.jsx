import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./QrStyle.css";
import QrScanner from "qr-scanner";
import { useAuth } from "../../AuthContext";
import { useData } from "../../DataContext";
import { api } from "../../scripts/Declarations";
import {
  Container,
  Box,
  Typography,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import { Row, Col } from "react-bootstrap";

const QrReader = () => {
  const { auth } = useAuth();
  const { assignedTable, setAssignedTable } = useData();
  const navigate = useNavigate();
  const scanner = useRef(null);
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);

  const onScanSuccess = (result) => {
    let guestsNumber = prompt("Please enter the number of guests:");
    const url = result?.data;
    const userId = auth.userData.userId;
    if (!(guestsNumber == null || guestsNumber == "")) {
      api
        .post(`${url}${userId}&guestsNumber=${guestsNumber}`, {})
        .then((response) => {
          alert(response.data.message);
          setAssignedTable(response.data.data);
          navigate("/in-restaurant");
        })
        .catch((error) => {
          alert(error.response.data.message);
          console.log(error.response);
          if (error.response.data.data) {
            navigate("/in-restaurant");
            setAssignedTable(error.response.data.data);
          }
        });
      scanner?.current?.stop();
    }
  };

  const onScanFail = (err) => {
    console.log(err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  return (
    <Container maxWidth="md" className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Please scan the QR code provided by the restaurant
              </Typography>
              {!qrOn && (
                <Alert severity="warning">
                  Camera is blocked or not accessible. Please allow camera in
                  your browser permissions and Reload.
                </Alert>
              )}
              <Box position="relative" className="qr-reader mt-4">
                <video ref={videoEl} className="w-100"></video>
                <Box ref={qrBoxEl} className="qr-box">
                  <img
                    src={"/images/qr-frame.svg"}
                    alt="Qr Frame"
                    width={256}
                    height={256}
                    className="qr-frame"
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default QrReader;
