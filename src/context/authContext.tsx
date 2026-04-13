import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { User } from "../types/user.interface";

interface AuthorisationMemo {
  user: null | User;
  loading: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthorisationMemo>({
  user: null,
  loading: false,
  isLoggedIn: false,
  setIsLoggedIn: () => {},
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
    () => ({ user, loading, isLoggedIn, setIsLoggedIn }),
    [user, loading, isLoggedIn, setIsLoggedIn],
  );

  useEffect(() => {
    // Check cookie validity on app boot
    fetch("/api/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setUser(data);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Auth check failed:", error);
        setUser(null);
        setIsLoggedIn(false);
        setLoading(false);
      });
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
