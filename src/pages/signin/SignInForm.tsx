export default function SignInForm() {
  return (
    <form className="space-y-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight">Vélo</h1>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-white transition-colors duration-300">
          Email
        </label>
        <input
          type="email"
          className="w-full border-b border-white/30 bg-transparent py-2 text-white transition-colors outline-none focus:border-white"
          style={{ boxShadow: "none" }}
        />
        <p className="text-sm text-red-500">Error message</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-white transition-colors duration-300">
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            className="w-full border-b border-white/30 bg-transparent py-2 text-white transition-colors outline-none focus:border-white"
            style={{ boxShadow: "none" }}
          />
          <button
            type="button"
            className="absolute top-2 right-0 text-white/60 transition-colors hover:text-white"
          >
            {/* Eye icon */}
          </button>
        </div>
        <p className="text-sm text-red-500">Error message</p>
      </div>

      <div className="flex items-center justify-between text-sm">
        <button
          type="button"
          className="text-white underline transition-opacity hover:opacity-70"
        >
          Forgot Password
        </button>
        <div className="flex items-center gap-2">
          <span className="text-gray-500">or</span>
          <button
            type="button"
            className="text-white underline transition-opacity hover:opacity-70"
          >
            Create an Account
          </button>
        </div>
      </div>

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
        className="w-full rounded-full bg-white py-3 font-medium text-black transition-all hover:bg-gray-200"
      >
        Sign In
      </button>
    </form>
  );
}
