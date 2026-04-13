import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";

export default function useNavigateBasedOnLogin(path: string) {
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  function handleClick() {
    const ifLoggedIn = isLoggedIn ? path : "/jointoday";

    navigate(ifLoggedIn);
  }

  return { handleClick };
}
