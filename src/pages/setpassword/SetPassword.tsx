import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { formFields } from "../../data/constants/inputsvalidation";
import { isInputValid } from "../../utils/validateInputs";
import postToApi from "../../service/appApi";
import { Loader2 } from "lucide-react";

export default function SetPassword() {
  const passwordJSPattern = formFields.password.jsPattern;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const validatePassword = isInputValid(passwordJSPattern, password);
  const passwordsMatch = password === confirmPassword && password.length > 0;
  const isFormValid = validatePassword && passwordsMatch;

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!isFormValid) {
      return;
    }

    setLoading(true);

    try {
      const body = { email, password, confirmPassword, token };
      const response = await postToApi("auth/set-password", body);

      if (!response.ok) {
        setError(
          "Could not set password. Please try again or contact support.",
        );
        return;
      }

      setSuccess(true);
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.log(err);
      setError("Unable to connect to server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div
        role="alert"
        className="flex min-h-screen items-center justify-center bg-black px-4"
      >
        <div className="w-full max-w-md space-y-8">
          <div className="relative flex items-center justify-center">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Vélo
            </h1>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-bold text-white">Password Set!</h2>
          </div>

          <div className="text-center">
            <p className="text-sm text-green-400">
              Your password has been successfully set. You can now log in with
              your new password.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/signin", { replace: true })}
            className="w-full rounded-full bg-white py-3 font-medium text-black transition-all hover:bg-gray-200"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <form onSubmit={handleSetPassword} className="w-full max-w-md space-y-8">
        <div className="relative flex items-center justify-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">Vélo</h1>
        </div>

        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">Set Password</h2>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-400">
            Create a strong password for your account below.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-500/50 bg-red-500/10 p-3"
          >
            <p className="text-center text-sm text-red-500">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-white">Password</label>
            <input
              type="password"
              value={password}
              pattern={formFields.password.jsxPattern}
              maxLength={formFields.password.maxLength}
              required
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-white/30 bg-transparent py-2 text-white transition-colors outline-none focus:border-white disabled:cursor-not-allowed disabled:opacity-50"
              style={{ boxShadow: "none" }}
            />
            {!validatePassword && password.length > 0 && (
              <p role="alert" className="text-sm text-red-500">
                {formFields.password.errorMessage}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              required
              disabled={loading}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border-b border-white/30 bg-transparent py-2 text-white transition-colors outline-none focus:border-white disabled:cursor-not-allowed disabled:opacity-50"
              style={{ boxShadow: "none" }}
            />
            {!passwordsMatch && confirmPassword.length > 0 && (
              <p role="alert" className="text-sm text-red-500">
                Passwords do not match
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={!isFormValid || loading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 font-medium text-black transition-all hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin text-black" />
              Setting Password...
            </>
          ) : (
            "Set Password"
          )}
        </button>
      </form>
    </div>
  );
}
