import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { formFields } from "../../data/constants/inputsvalidation";
import validateField, { isInputValid } from "../../utils/validateInputs";

interface SignInFormProps {
  onForgotPassword: () => void;
}

export default function SignInForm({ onForgotPassword }: SignInFormProps) {
  const emailJSPattern = formFields.email.jsPattern;
  const passwordJSPattern = formFields.password.jsPattern;

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

  const isFormValid =
    isInputValid(emailJSPattern, formfieldsValues.email) &&
    isInputValid(passwordJSPattern, formfieldsValues.password);

  const handleSignIn = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputName: string,
    jsPattern: string,
  ) => {
    const { value } = e.target;
    setFormFieldsValues((prev) => ({ ...prev, [inputName]: value }));
    validateField(setFormErrors, inputName, value, jsPattern);
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight">Vélo</h1>
      </div>

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
          onChange={(e) => handleChange(e, "email", emailJSPattern)}
          onFocus={() => setFocusedField("email")}
          onBlur={() => {
            setFocusedField(null);
          }}
          className="w-full border-b border-white/30 bg-transparent py-2 text-white transition-colors outline-none focus:border-white"
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
            onChange={(e) => handleChange(e, "password", passwordJSPattern)}
            onFocus={() => setFocusedField("password")}
            onBlur={() => {
              setFocusedField(null);
            }}
            className="w-full border-b border-white/30 bg-transparent py-2 text-white transition-colors outline-none focus:border-white"
            style={{ boxShadow: "none" }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-2 right-0 text-white/60 transition-colors hover:text-white"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {formErrors.password && (
          <p className="text-sm text-red-500">
            {formFields.password.errorMessage}
          </p>
        )}
      </div>

      <div className="flex items-center gap-1 text-sm">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-white underline transition-opacity hover:opacity-70"
        >
          Forgot Password
        </button>
        <div className="flex items-center gap-1">
          <span className="text-gray-500">or</span>
          <button
            type="button"
            className="text-white underline transition-opacity hover:opacity-70"
          >
            Create an Account
          </button>
        </div>
      </div>

      {/* Terms - with links */}
      <div className="text-center text-xs text-gray-400">
        By clicking "Sign in", you agree to our{" "}
        <button
          type="button"
          className="text-white underline transition-opacity hover:opacity-70"
        >
          Terms and Conditions
        </button>{" "}
        and consent to our{" "}
        <button
          type="button"
          className="text-white underline transition-opacity hover:opacity-70"
        >
          Privacy Policy
        </button>
        .
      </div>

      <button
        type="submit"
        disabled={!isFormValid}
        className="w-full rounded-full bg-white py-3 font-medium text-black transition-all hover:bg-gray-200"
      >
        Sign In
      </button>
    </form>
  );
}
