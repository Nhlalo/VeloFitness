export default function ForgotPassword() {
  return (
    <form className="space-y-8">
      <div className="relative flex items-center justify-center">
        <button
          type="button"
          className="absolute left-0 text-white transition-transform hover:scale-110"
        >
          {/* ArrowLeft icon */}
        </button>
        <h1 className="text-3xl font-bold tracking-tight">Vélo</h1>
      </div>

      <div className="text-center">
        <h2 className="text-4xl font-bold">Reset Password</h2>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-400">
          Enter the email address associated with your Equinox account below.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-white">Email</label>
        <input
          type="email"
          className="w-full border-b border-white/30 bg-transparent py-2 text-white transition-colors outline-none focus:border-white"
          style={{ boxShadow: "none" }}
        />
        <p className="text-sm text-red-500">Error message</p>
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-white py-3 font-medium text-black transition-all hover:bg-gray-200"
      >
        Reset Password
      </button>
    </form>
  );
}
