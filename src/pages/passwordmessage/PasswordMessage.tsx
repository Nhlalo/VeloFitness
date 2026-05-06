import { Mail } from "lucide-react";

export default function PasswordMessage() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md rounded-lg border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-sm">
        <div className="text-center">
          <div aria-hidden="true" className="mb-4 flex justify-center">
            return <Mail className="h-12 w-12 text-green-400" />
          </div>
          <p className="mb-2 text-lg font-medium text-white">
            Check your email
          </p>
          <p className="text-sm leading-relaxed text-gray-300">
            If an account exists for this email address, you'll receive password
            reset instructions.
          </p>
        </div>
        <div className="mt-6 border-t border-white/20 pt-4">
          <p className="text-center text-xs text-gray-400">
            Didn't receive an email? Check your spam folder or try again.
          </p>
        </div>
      </div>
    </div>
  );
}
