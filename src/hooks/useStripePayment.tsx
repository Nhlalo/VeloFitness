import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { MetaData } from "../types/stripemetadata.interface";
import apiRequest from "../service/appApi";

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
    metadata: MetaData,
    userInfor: Record<string, string>,
  ) => {
    if (!stripe || !elements) {
      console.error("Stripe not initialized. Please refresh the page.");
      setError("Payment system is loading. Please wait or refresh the page.");
      return { success: false, error: "Payment system not ready" };
    }
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error("Payment form not properly loaded");
      throw new Error("Payment form not properly loaded");
    }

    setLoading(true);
    setError(null);

    try {
      console.log("EMAIL", metadata.customerEmail);
      console.log("Membership Title", userInfor.membershipTitle);
      const response = await apiRequest("checkout", {
        email: metadata.customerEmail,
        membershipTitle: userInfor.membershipTitle,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(
          `API Error: ${response.status} ${response.statusText}`,
          errorData,
        );
        setError("Payment failed. Please try again or contact support.");
        return {
          success: false,
          error: "Payment failed. Please try again or contact support.",
        };
      }

      const { clientSecret } = await response.json();

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: metadata.customerName,
              email: metadata.customerEmail,
            },
          },
        });

      if (stripeError) {
        console.log(stripeError);
        const friendlyError = getUserFriendlyErrorMessage(stripeError);
        setError(friendlyError);
        return { success: false, error: friendlyError };
      }
      console.log("Payment successful");

      const createUserProfile = await apiRequest("profile/create", {
        ...userInfor,
        paymentIntentId: paymentIntent.id,
      });

      if (!createUserProfile.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(
          `API Error: ${response.status} ${response.statusText}`,
          errorData,
        );
        setError("Payment failed. Please try again or contact support.");
        return {
          success: false,
          error: "Payment failed. Please try again or contact support.",
        };
      }

      const userProfileData = await createUserProfile.json();
      const token = userProfileData?.data.token;

      setSuccess(true);
      return { success: true, paymentIntent, token };
    } catch (err) {
      console.log(err);
      setError("Unable to connect to server. Please check your connection.");
      return {
        success: false,
        error: "Unable to connect to server. Please check your connection.",
      };
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
