import { useState, useMemo } from "react";
import SignInForm from "./SignInForm";
import ForgotPassword from "./ForgotPassword";

export default function SignIn() {
  const [view, setView] = useState<"login" | "forgot">("login");

  const [loading, setLoading] = useState<boolean>(false);

  const loadingMemo = useMemo(
    () => ({ loading, setLoading }),
    [loading, setLoading],
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="relative w-full max-w-md">
        <div className="relative grid">
          <div
            className={`col-start-1 row-start-1 transition-all delay-50 duration-500 ${
              view === "login"
                ? "visible translate-x-0 opacity-100"
                : "pointer-events-none invisible -translate-x-full opacity-0"
            }`}
          >
            <SignInForm
              onForgotPassword={() => setView("forgot")}
              loadingState={loadingMemo}
            />
          </div>

          <div
            className={`absolute top-0 bottom-0 col-start-1 row-start-1 transition-all delay-100 duration-500 ${
              view === "forgot"
                ? "visible right-0 opacity-100"
                : "pointer-events-none invisible right-0 left-0 opacity-0"
            }`}
          >
            <ForgotPassword
              onBack={() => setView("login")}
              loadingState={loadingMemo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
