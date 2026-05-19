import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router";
import { Home } from "lucide-react";

export default function ErrorElement() {
  const error = useRouteError();
  const navigate = useNavigate();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center">
        <h1 className="text-6xl font-bold text-white">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-white">
          Page Not Found
        </h2>
        <p className="mt-2 text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-8 flex items-center gap-2 rounded-full bg-white px-6 py-2 font-medium text-black transition-all hover:bg-gray-200"
        >
          <Home className="h-4 w-4" />
          Go Home
        </button>
      </div>
    );
  }

  // For other errors (500, etc.)
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center">
      <h1 className="text-4xl font-bold text-white">Something went wrong</h1>
      <p className="mt-2 text-gray-400">Please try again later.</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-8 rounded-full bg-white px-6 py-2 font-medium text-black"
      >
        Try Again
      </button>
    </div>
  );
}
