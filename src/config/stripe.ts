import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  "pk_test_51P1234567890abcdefghijklmnopqrstuvwxyz",
);

export const STRIPE_DEMO_NOTICE = {
  title: "🔐 Demo Mode - Test Payment Information",
  cardNumber: "4242 4242 4242 4242",
  expiry: "12/34",
  cvc: "123",
  zip: "12345",
  message:
    "Use the following test card details for payment. No real charges will be made.",
};
