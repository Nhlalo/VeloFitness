import { useState } from "react";
import SignInForm from "./SignInForm";
import ForgotPassword from "./ForgotPassword";

export default function SignIn() {
  const [view, setView] = useState<"login" | "forgot">("login");

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="relative w-full max-w-md">
        <div className="grid">
          <div
            className={`col-start-1 row-start-1 transition-all duration-500 ${
              view === "login"
                ? "visible translate-x-0 opacity-100"
                : "pointer-events-none invisible -translate-x-full opacity-0"
            }`}
          >
            <SignInForm onForgotPassword={() => setView("forgot")} />
          </div>

          <div
            className={`col-start-1 row-start-1 transition-all duration-500 ${
              view === "forgot"
                ? "visible translate-x-0 opacity-100"
                : "pointer-events-none invisible translate-x-full opacity-0"
            }`}
          >
            <ForgotPassword onBack={() => setView("login")} />
          </div>
        </div>
      </div>
    </div>
  );
}
