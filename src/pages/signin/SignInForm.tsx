export default function SignInForm() {
  return (
    <form>
      <div>
        <h1>Vélo</h1>
      </div>

      <div>
        <label>Email</label>
        <input type="email" />
        <p>Error message</p>
      </div>

      <div>
        <label>Password</label>
        <div>
          <input type="password" />
          <button type="button">{/* Eye icon */}</button>
        </div>
        <p>Error message</p>
      </div>

      <div>
        <button type="button">Forgot Password</button>
        <div>
          <span>or</span>
          <button type="button">Create an Account</button>
        </div>
      </div>

      <div>
        By clicking "Sign in", you agree to our{" "}
        <button type="button">Terms and Conditions</button> and consent to our{" "}
        <button type="button">Privacy Policy</button>.
      </div>

      <button type="submit">Sign In</button>
    </form>
  );
}
