import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null> | null = null; // ← Outside React, just a regular variable

//Stripe will handle the customer payments
const getStripe = (key: string) => {
  if (!stripePromise) {
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};

export { getStripe };
