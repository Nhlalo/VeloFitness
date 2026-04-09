import SignInForm from "./SignInForm";
import ForgotPassword from "./ForgotPassword";

export default function SignIn() {
  return (
    <div>
      <div>
        <div>
          <div>
            <SignInForm />
          </div>

          <div>
            <ForgotPassword />
          </div>
        </div>
      </div>
    </div>
  );
}
