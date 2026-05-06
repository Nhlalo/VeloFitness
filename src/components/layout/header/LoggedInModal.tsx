import { useNavigate } from "react-router";
import { useAuth } from "../../../context/authContext";
import generateInitials from "../../../utils/generateInitials.ts";

export default function LoggedInModal({
  setShowUserMenu,
}: {
  setShowUserMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();

  const { user, setIsLoggedIn } = useAuth();

  const userInitials = generateInitials(
    user?.name as string,
    user?.surname as string,
  );

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };
  return (
    <div className="ring-opacity-5 absolute right-0 mt-3 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black transition-all duration-200">
      <div className="py-2">
        <div className="border-b border-gray-100 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-[#AAFF00] to-[#8BCC00]">
              <span className="text-sm font-bold text-gray-900">
                {userInitials}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">
                {user?.name}
              </span>
              <span className="text-xs text-gray-500">{user?.email}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            navigate("/profile");
            setShowUserMenu(false);
          }}
          className="w-full px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
        >
          Profile Settings
        </button>

        <button
          onClick={() => {
            navigate("/mymembership");
            setShowUserMenu(false);
          }}
          className="w-full px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
        >
          Membership
        </button>

        <hr className="my-1 border-gray-100" />

        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
