import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";

export default function useNavigateBasedOnLogin() {
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  function handleClick() {
    const ifLoggedIn = isLoggedIn ? "/profile" : "/jointoday";

    navigate(ifLoggedIn);
  }

  return { handleClick };
}
