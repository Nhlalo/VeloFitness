import { useState, useEffect, useRef, useCallback } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../../context/authContext";

interface ProtectRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  verificationInterval?: number; // Time in milliseconds between verifications
}

export default function ProtectedRoute({
  children,
  redirectTo = "/signin",
  verificationInterval = 5 * 60 * 1000, // 5 minutes
}: ProtectRouteProps) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { setIsLoggedIn, setUser } = useAuth();

  const [shouldRedirect, setShouldRedirect] = useState(false);
  const intervalRef = useRef<number | undefined>(undefined);
  const isVerifyingRef = useRef(false);

  const verifyAuth = useCallback(async () => {
    // Prevent multiple simultaneous verification requests
    if (isVerifyingRef.current) return;

    isVerifyingRef.current = true;

    try {
      const response = await fetch(`${apiUrl}/v1/auth/verify`, {
        credentials: "include",
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      if (!response.ok) {
        console.error(`Verification failed: ${response.status}`);
        setUser(null);
        setIsLoggedIn(false);
        setShouldRedirect(true);

        // Stop further verifications since we're redirecting
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      } else {
        const data = await response.json();
        const user = data.user;
        console.log("Verification successful at:", new Date().toISOString());
        setUser({ ...user });
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Verification request failed:", error);
    } finally {
      isVerifyingRef.current = false;
    }
  }, [apiUrl, setUser, setIsLoggedIn]);

  useEffect(() => {
    verifyAuth();

    // Set up interval for periodic verification
    intervalRef.current = window.setInterval(verifyAuth, verificationInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [verifyAuth, verificationInterval]);

  // Redirect if verification failed
  if (shouldRedirect) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}
