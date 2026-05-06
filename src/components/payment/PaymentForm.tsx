import { CardElement } from "@stripe/react-stripe-js";
import { useStripePayment } from "../../hooks/useStripePayment";
import { STRIPE_DEMO_NOTICE } from "../../config/stripe";
import { Info, Lock } from "lucide-react";

type PaymentFormProps = {
  amount: number;
  currency?: string;
  onSuccess: (token: string) => void;
  onError: (error: string) => void;
  buttonText?: string;
  disabled?: boolean;
  userInfor: Record<string, string>;
};

export default function PaymentForm({
  amount,
  onSuccess,
  onError,
  buttonText,
  disabled = false,
  userInfor,
}: PaymentFormProps) {
  const {
    processPayment,
    loading,
    error,
    success,
    cardComplete,
    setCardComplete,
    cardError,
    setCardError,
  } = useStripePayment();

  const isFormValid = !disabled && cardComplete && !loading && !success;

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid || loading) return;

    const result = await processPayment(
      {
        customerEmail: userInfor.email,
        customerName: userInfor.name,
        orderId: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      },
      userInfor,
    );

    if (result.success && onSuccess && result.paymentIntent) {
      onSuccess(result.token);
    }
    if (!result.success && onError && result.error) {
      onError(result.error);
    }
  };

  // Handle card element changes
  const handleCardChange = (event: any) => {
    setCardComplete(event.complete);
    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError(null);
    }
  };

  return (
    <div className="mt-6 rounded-lg border border-gray-200 bg-white p-5">
      <form onSubmit={handleSubmit}>
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Payment</h3>

        <div className="mb-4 flex items-start gap-2 rounded-md border border-blue-200 bg-blue-50 p-3">
          <Info size={18} className="mt-0.5 shrink-0 text-blue-500" />
          <div className="text-xs text-blue-700">
            <span className="font-bold">Test Mode:</span> Use{" "}
            <span className="font-mono font-bold">
              {STRIPE_DEMO_NOTICE.cardNumber}
            </span>{" "}
            with any future expiry (e.g., {STRIPE_DEMO_NOTICE.expiry}) and CVC (
            {STRIPE_DEMO_NOTICE.cvc})
          </div>
        </div>

        <div
          className={`mb-4 rounded-lg border bg-white p-3 transition-all ${
            disabled
              ? "border-gray-200 bg-gray-50 opacity-60"
              : "border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200"
          }`}
        >
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#1f2937",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  "::placeholder": {
                    color: "#9ca3af",
                  },
                },
                invalid: {
                  color: "#dc2626",
                  iconColor: "#dc2626",
                },
              },
              hidePostalCode: true,
              disabled: disabled,
            }}
            onChange={handleCardChange}
          />
        </div>

        {cardError && !disabled && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-700">{cardError}</p>
          </div>
        )}

        {disabled && (
          <div className="mb-4 rounded-md border border-yellow-200 bg-yellow-50 p-3">
            <p className="text-sm text-yellow-800">
              ⚠️ Please accept all terms and conditions above to enable payment
            </p>
          </div>
        )}

        {!disabled && !cardComplete && !cardError && (
          <div className="mb-4 rounded-md border border-blue-200 bg-blue-50 p-3">
            <p className="text-sm text-blue-800">
              💳 Please enter your card details to complete payment
            </p>
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-md border border-green-200 bg-green-50 p-3">
            <p className="text-sm text-green-700">
              ✓ Payment successful! Your membership is being processed.
            </p>
          </div>
        )}

        <div className="mb-4 flex items-center justify-center gap-2 text-xs text-gray-500">
          <Lock size={12} />
          <span>Secure payment powered by Stripe</span>
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full rounded-md py-3 text-center font-medium transition-all ${
            !isFormValid
              ? "cursor-not-allowed bg-gray-300 text-gray-500"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </span>
          ) : (
            buttonText || `Pay $${amount.toFixed(2)}`
          )}
        </button>
      </form>
    </div>
  );
}
