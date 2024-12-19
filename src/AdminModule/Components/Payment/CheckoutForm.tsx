import { useState } from "react";
import { Button, Container, Box, Typography } from "@mui/material";
import {
  useStripe,
  useElements,
  CardElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../Constants/Components/Urls";

const CheckoutForm = ({ bookingId, setActiveStep }) => {
  const [addressComplete, setAddressComplete] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!addressComplete) {
      toast.error("Please complete the address details.");
      return;
    }

    if (!cardComplete) {
      toast.error("Please complete the card details.");
      return;
    }

    handlePayment();
  };

  const handlePayment = async () => {
    if (!bookingId) {
      toast.error("Invalid booking ID");
      return;
    }

    try {
      const adminToken = localStorage.getItem("adminToken");
      if (!adminToken) {
        throw new Error("Admin token is missing");
      }

      const cardElement = elements.getElement(CardElement);
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        toast.error(error.message);
      } else {
        const response = await axios.post(
          `${baseUrl}/portal/booking/${bookingId}/pay`,
          { payment_method_id: paymentMethod.id },
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );
        
        toast.success("Payment completed successfully! Thank you for choosing our services.");
        setActiveStep(1);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An error occurred.";

      toast.error(errorMessage);
    }
  };

  const handleAddressChange = (event) => {
    setAddressComplete(event.complete);
  };

  const handleCardChange = (event) => {
    setCardComplete(event.complete);
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <AddressElement options={{ mode: "shipping" }} onChange={handleAddressChange} />
        <Typography
          component={"p"}
          variant="body2"
          sx={{ mt: 1, opacity: 0.9 }}
        >
          Card Number
        </Typography>
        <Box sx={{ bgcolor: "#f1f1f1", padding: 2, borderRadius: 3 }}>
          <CardElement options={{ hidePostalCode: true }} onChange={handleCardChange} />
        </Box>
        <Button
          disabled={!stripe}
          type="submit"
          sx={{
            width: "100%",
            bgcolor: "primary.main",
            color: "white",
            transition: "0.5s",
            mt: 2,
            "&:hover": {
              bgcolor: "primary.light",
            },
          }}
        >
          Continue to Book
        </Button>
      </Box>
    </Container>
  );
};

export default CheckoutForm;
