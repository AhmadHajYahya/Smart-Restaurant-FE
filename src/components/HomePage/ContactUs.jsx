import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";

const address = "Taybee, Central Israel";
const email = "Ahmad.hajyahyaa@gmail.com";
const phone = "050-2004576";

function ContactUs() {
  return (
    <Box id="contact" className="py-5">
      <Container>
        <Box textAlign="center" mb={5}>
          <Typography variant="h2" className="fw-bold my-5">
            Contact Us
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box className="contact-details" mb={5}>
              <Typography display="flex" alignItems="center" mb={2}>
                <PlaceIcon />
                <span style={{ marginLeft: "8px" }}>{address}</span>
              </Typography>
              <Typography display="flex" alignItems="center" mb={2}>
                <EmailIcon />
                <span style={{ marginLeft: "8px" }}>{email}</span>
              </Typography>
              <Typography display="flex" alignItems="center" mb={2}>
                <LocalPhoneIcon />
                <span style={{ marginLeft: "8px" }}>{phone}</span>
              </Typography>
              <Typography display="flex" alignItems="center" mb={2}>
                <LinkedInIcon />
                <a
                  href="https://www.linkedin.com/in/ahmad-hajyahya/"
                  className="me-2"
                  style={{ marginLeft: "8px" }}
                >
                  ahmad-hajyahya
                </a>
              </Typography>
            </Box>
            <Box mt="auto" display="flex" alignItems="center">
              <img
                src="/images/BurgerIcon.png"
                alt="Brand Icon"
                width="140"
                height="114"
              />
              <Typography
                variant="h3"
                className="m-0 ms-3 fw-bold"
                style={{ fontSize: "50px" }}
              >
                Burger <br /> Brand
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <form>
              <Typography variant="h4">
                Have a message for us? Please tell..
              </Typography>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Message"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                multiline
                rows={4}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="my-btn"
                style={{ color: "black" }}
              >
                Submit
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ContactUs;
