import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
  createTheme,
} from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Link, useParams } from "react-router-dom";
import finishedPayment from "../../../assets/Group 1 1.png";
import BcaImage from "../../../assets/image 4.png";
import mandlrl from "../../../assets/image 5.png";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8"
);

const steps = ["Payment Now", "Payment Finished"];

const Payment = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const { id } = useParams();
  const stepStyle = {
    boxShadow: 2,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 3,
    padding: 2,
    mt: 0,
    mb: "50px",
    "& .Mui-active": {
      "&.MuiStepIcon-root": {
        color: "rgba(26, 188, 156, 1)",
        fontSize: "3rem",
      },
      "& .MuiStepConnector-line": {
        borderColor: "warning.main",
      },
    },
    "& .Mui-completed": {
      "&.MuiStepIcon-root": {
        color: "secondary.main",
        fontSize: "3rem",
      },
      "& .MuiStepConnector-line": {
        borderColor: "secondary.main",
      },
    },
  };
  const theme = createTheme({
    palette: {
      primary: {
        light: "#3252df",
        main: "#152c5b",
        dark: "#0252df",
      },
    },
  });

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  return (
    <>
      <Box sx={{ mt: 5, p: 0 }}>
        <Link
          to={"/"}
          style={{
            color: "#3252df",
            fontSize: "1.5rem",
            textDecoration: "none",
            fontWeight: 600,
            display: "block",
            textAlign: "center",
          }}
        >
          Stay
          <Typography component="span" variant="h5" sx={{ color: "#152c5b" }}>
            cation.
          </Typography>
        </Link>
        <Divider sx={{ bgcolor: "gray", mt: 1 }} />
        {/* <hr/> */}
      </Box>

      <Elements
        stripe={stripePromise}
        options={{ appearance: { theme: "flat" } }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            py: 2,
            m: 0,
          }}
        >
          <Container sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep} sx={stepStyle}>
              {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                  optional?: React.ReactNode;
                } = {};

                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length - 2 ? (
              <>
                <Box sx={{ textAlign: "center", mb: 2 }}>
                  <Typography
                    component={"h3"}
                    variant="h3"
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    Payment
                  </Typography>
                  <Typography component={"p"} variant="p">
                    Kindly follow the instructions below
                  </Typography>
                </Box>

                <Grid container spacing={2} sx={{ m: 0, p: 0 }}>
                  <Container
                    maxWidth={"xl"}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Grid item xs={12} md={6}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          ml: "auto",
                          alignItems: "center",
                          gap: 4,
                          width: "90%",
                        }}
                      >
                        <Box sx={{ width: "275px", lineHeight: "50px" }}>
                          <Typography sx={{ lineHeight: "35px" }}>
                            Transfer Pembayaran:
                            <br />
                            Tax: 10%
                            {/* <br /> */}
                            {/* Sub total: $480 USD */}
                            {/* <br /> */}
                            {/* Total: $580 USD */}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            mt: 1,
                            minWidth: "275px",
                          }}
                        >
                          <Box>
                            <img src={BcaImage} alt="" />
                          </Box>
                          <Typography sx={{ lineHeight: "35px" }}>
                            Bank Central Asia
                            <br />
                            2208 1996
                            <br />
                            BuildWith Angga
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            mt: 1,
                            minWidth: "275px",
                          }}
                        >
                          <Box>
                            <img src={mandlrl} alt="" />
                          </Box>
                          <Typography sx={{ lineHeight: "35px" }}>
                            Bank Central Asia
                            <br />
                            2208 1996
                            <br />
                            BuildWith Angga
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box sx={{ width: "100%" }}>
                        <CheckoutForm
                          bookingId={id}
                          setActiveStep={setActiveStep}
                        />
                      </Box>
                    </Grid>
                  </Container>
                </Grid>
              </>
            ) : (
              <React.Fragment>
                <Box
                  sx={{
                    mt: 5,
                    mb: 1,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img src={finishedPayment} alt="finishedPayment" />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button variant="contained">
                    <Link
                      to={"/"}
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Back TO Home
                    </Link>
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Container>
        </Box>
      </Elements>
    </>
  );
};

export default Payment;
