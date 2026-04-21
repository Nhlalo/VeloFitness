import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { MetaData } from "../types/stripemetadata.interface";

export const useStripePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();

  const getUserFriendlyErrorMessage = (error: any): string => {
    // Log for debugging (only in development)
    // if (process.env.NODE_ENV === "development") {
    //   console.error("Payment error:", error);
    // }

    if (error.code === "card_declined") {
      return "Your card was declined. Please try a different card.";
    }

    if (error.code === "insufficient_funds") {
      return "Insufficient funds. Please use a different card.";
    }

    if (error.message?.includes("network")) {
      return "Network error. Please check your connection.";
    }
    return "Payment failed. Please try again or contact support.";
  };

  const processPayment = async (
    amount: number,
    currency = "usd",
    metadata: MetaData,
  ) => {
    if (!stripe || !elements) {
      setError("Stripe not initialized. Please refresh the page.");
      return { success: false, error: "Stripe not initialized" };
    }
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      throw new Error("Payment form not properly loaded");
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${"http://localhost:3000"}/api/create-payment-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount, currency, metadata }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const { clientSecret } = await response.json();

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: metadata.customerName || "Member",
              email: metadata.customerEmail || "member@example.com",
            },
          },
        });

      if (stripeError) {
        const friendlyError = getUserFriendlyErrorMessage(stripeError);
        setError(friendlyError);
        return { success: false, error: friendlyError };
      }

      setSuccess(true);
      return { success: true, paymentIntent };
    } catch (err) {
      const friendlyError = getUserFriendlyErrorMessage(err);
      setError(friendlyError);
      return { success: false, error: friendlyError };
    } finally {
      setLoading(false);
    }
  };

  return {
    processPayment,
    loading,
    error,
    success,
    cardComplete,
    setCardComplete,
    cardError,
    setCardError,
  };
};
