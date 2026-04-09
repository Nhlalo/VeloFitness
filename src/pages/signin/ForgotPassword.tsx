export default function ForgotPassword() {
  return (
    <form>
      <div>
        <button type="button">{/* ArrowLeft icon */}</button>
        <h1>Vélo</h1>
      </div>

      <div>
        <h2>Reset Password</h2>
      </div>

      <div>
        <p>
          Enter the email address associated with your Equinox account below.
        </p>
      </div>

      <div>
        <label>Email</label>
        <input type="email" />
        <p>Error message</p>
      </div>

      <button type="submit">Reset Password</button>
    </form>
  );
}
