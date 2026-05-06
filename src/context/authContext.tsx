import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { User } from "../types/user.interface";

interface AuthorisationMemo {
  user: null | User;
  loading: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthorisationMemo>({
  user: null,
  loading: false,
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  setUser: () => {},
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<null | User>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const authorisation = useMemo<AuthorisationMemo>(
    () => ({ user, loading, isLoggedIn, setUser, setIsLoggedIn }),
    [user, loading, isLoggedIn, , setUser, setIsLoggedIn],
  );

  useEffect(() => {
    // Check cookie validity on app boot
    const authorize = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;

        const response = await fetch(`${apiUrl}/v1/auth/verify`, {
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.warn(
            `Authentication Error: ${response.status} ${response.statusText}`,
            errorData,
          );
          setUser(null);
          setIsLoggedIn(false);
          setLoading(false);
          return;
        }

        const data = await response.json();
        setUser(data.user);
        setIsLoggedIn(true);
        setLoading(false);
      } catch (error) {
        console.warn("Auth check failed:", error);
        setUser(null);
        setIsLoggedIn(false);
        setLoading(false);
      }
    };

    authorize();
  }, []);

  return (
    <AuthContext.Provider value={authorisation}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
