import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { formFields } from "../../data/constants/inputsvalidation";
import validateField, { isInputValid } from "../../utils/validateInputs";
import apiRequest from "../../service/appApi";
import { useAuth } from "../../context/authContext";

interface SignInFormProps {
  onForgotPassword: () => void;
  loadingState: {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export default function SignInForm({
  onForgotPassword,
  loadingState,
}: SignInFormProps) {
  const { setUser } = useAuth();

  const emailJSPattern = formFields.email.jsPattern;
  const passwordJSPattern = formFields.password.jsPattern;

  const { loading, setLoading } = loadingState;
  const [formfieldsValues, setFormFieldsValues] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
  });
  const [focusedField, setFocusedField] = useState<"email" | "password" | null>(
    null,
  );
  const [Error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const isFormValid =
    isInputValid(emailJSPattern, formfieldsValues.email) &&
    isInputValid(passwordJSPattern, formfieldsValues.password);

  const handleSignIn = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setError(null);
    setLoading(true);

    try {
      const body = {
        email: formfieldsValues.email,
        password: formfieldsValues.password,
      };
      const response = await apiRequest("auth/login", body);

      if (!response.ok) {
        let errorMessage = "Invalid email or password. Please try again.";
        const errorData = await response.json().catch(() => ({}));
        console.error(
          `API Error: ${response.status} ${response.statusText}`,
          errorData,
        );

        setError(errorMessage);
        setLoading(false);
        return;
      }
      const data = await response.json();
      setLoading(false);
      setUser(data.user);
      navigate("/profile", { replace: true });
    } catch (error) {
      setLoading(false);
      setError("Unable to connect to server. Please check your connection.");
      console.error("Login error:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputName: string,
    jsPattern: string,
  ) => {
    const { value } = e.target;
    setFormFieldsValues((prev) => ({ ...prev, [inputName]: value }));
    validateField(setFormErrors, inputName, value, jsPattern);
    // Clear error when user starts typing again
    if (Error) setError(null);
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight">Vélo</h1>
      </div>

      {Error && (
        <div
          role="alert"
          className="rounded-lg border border-red-500/50 bg-red-500/10 p-3"
        >
          <p className="text-center text-sm text-red-500">{Error}</p>
        </div>
      )}

      <div className="space-y-2">
        <label
          className={`text-sm transition-colors duration-300 ${
            focusedField === "email"
              ? "text-white"
              : focusedField === "password"
                ? "text-gray-400"
                : "text-white"
          }`}
        >
          Email
        </label>
        <input
          type="email"
          value={formfieldsValues.email}
          pattern={formFields.email.jsxPattern}
          maxLength={formFields.email.maxLength}
          required
          disabled={loading}
          onChange={(e) => handleChange(e, "email", emailJSPattern)}
          onFocus={() => setFocusedField("email")}
          onBlur={() => {
            setFocusedField(null);
          }}
          className={`w-full border-b bg-transparent py-2 text-white transition-colors outline-none focus:border-white disabled:cursor-not-allowed disabled:opacity-50 ${
            Error ? "border-red-500/50" : "border-white/30"
          }`}
          style={{ boxShadow: "none" }}
        />
        {formErrors.email && (
          <p className="text-sm text-red-500">
            {formFields.email.errorMessage}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          className={`text-sm transition-colors duration-300 ${
            focusedField === "password"
              ? "text-white"
              : focusedField === "email"
                ? "text-gray-400"
                : "text-white"
          }`}
        >
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={formfieldsValues.password}
            required
            minLength={8}
            maxLength={64}
            pattern={formFields.password.jsxPattern}
            disabled={loading}
            onChange={(e) => handleChange(e, "password", passwordJSPattern)}
            onFocus={() => setFocusedField("password")}
            onBlur={() => {
              setFocusedField(null);
            }}
            className={`w-full border-b bg-transparent py-2 text-white transition-colors outline-none focus:border-white disabled:cursor-not-allowed disabled:opacity-50 ${
              Error ? "border-red-500/50" : "border-white/30"
            }`}
            style={{ boxShadow: "none" }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={loading}
            className="absolute top-2 right-0 text-white/60 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {formErrors.password && (
          <p role="alert" className="text-sm text-red-500">
            {formFields.password.errorMessage}
          </p>
        )}
      </div>

      <div className="flex items-center gap-1 text-sm">
        <button
          type="button"
          onClick={onForgotPassword}
          disabled={loading}
          className="text-white underline transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Forgot Password
        </button>
        <div className="flex items-center gap-1">
          <span className="text-gray-500">or</span>
          <button
            type="button"
            className="text-white underline transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => navigate("/jointoday")}
            disabled={loading}
          >
            Create an Account
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400">
        By clicking "Sign in", you agree to our{" "}
        <button
          type="button"
          className="text-white underline transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={loading}
        >
          Terms and Conditions
        </button>{" "}
        and consent to our{" "}
        <button
          type="button"
          className="text-white underline transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={loading}
        >
          Privacy Policy
        </button>
        .
      </div>

      <button
        type="submit"
        disabled={!isFormValid || loading}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 font-medium text-black transition-all hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin text-black" />
            Signing In...
          </>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
}
