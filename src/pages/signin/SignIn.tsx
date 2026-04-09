import { useState } from "react";
import SignInForm from "./SignInForm";
import ForgotPassword from "./ForgotPassword";

export default function SignIn() {
  const [view, setView] = useState<"login" | "forgot">("login");

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-md overflow-hidden">
        <div className="relative">
          <div
            className={`transition-all duration-500 ${
              view === "login"
                ? "translate-x-0 opacity-100"
                : "absolute inset-0 -translate-x-full opacity-0"
            }`}
          >
            <SignInForm onForgotPassword={() => setView("forgot")} />
          </div>

          <div
            className={`transition-all duration-500 ${
              view === "forgot"
                ? "translate-x-0 opacity-100"
                : "absolute inset-0 translate-x-full opacity-0"
            }`}
          >
            <ForgotPassword onBack={() => setView("login")} />
          </div>
        </div>
      </div>
    </div>
  );
}
