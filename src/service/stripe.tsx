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

/* const CheckoutPage = () => {
  const handlePayment = async () => {
    const stripe = await getStripe('pk_test_KEY'); // ← Just waiting for promise
    await stripe.redirectToCheckout({...});
  };
  
  return <button onClick={handlePayment}>Join Now</button>;
};*/
