import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useRouteHandle from "../../../hooks/useRouteHandle.tsx";
import { useAuth } from "../../../context/authContext.tsx";
import { Menu } from "lucide-react";
import { navLinksContent } from "../../../data/constants/navigation.ts";
import handleScrollToTop from "../../../utils/scrollToTop.ts";
import LoggedInModal from "./LoggedInModal.tsx";
import Sidebar from "./Sidebar.tsx";
import Logo from "../../../assets/images/logo.png";

export default function Header({}) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);

  const lastFocusedElement = useRef<HTMLElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const url = useLocation();

  const navigate = useNavigate();

  const { user, isLoggedIn } = useAuth();

  const colorScheme = useRouteHandle();

  const currentColors = isScrolled
    ? colorScheme?.scrolled
    : colorScheme?.default;

  const loggedInLinks = isLoggedIn
    ? navLinksContent.filter((link) => link.content.toLowerCase() != "sign in")
    : navLinksContent;

  useEffect(() => {
    const handleScroll = () => {
      const hasScrolled = window.pageYOffset > 0;
      setIsScrolled(hasScrolled);
    };

    // Use passive for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //This will display the side bar
  function handleOpeningSidebar() {
    //Store the last focused element before opening the sidebar
    lastFocusedElement.current = document.activeElement as HTMLElement;
    setShowSidebar(true);
  }

  //This will be passed down to the sidebar(child component)
  function handleSidebarDisplay(value: boolean) {
    setShowSidebar(value);
  }

  function handleHomePage() {
    navigate("/");
  }

  const handleClick = () => {
    url.pathname === "/" ? handleScrollToTop() : handleHomePage();
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <>
      {/* Placeholder pushes the content down, while the real header floats above it. */}
      <div className="h-20" aria-hidden="true"></div>
      <header
        style={{
          backgroundColor: currentColors?.bg,
          color: currentColors?.color,
        }}
        className="fixed top-0 z-1000 flex h-20 w-full justify-center py-3"
      >
        <div className="flex w-[95%] items-center justify-between">
          <button
            onClick={handleClick}
            aria-label="Scroll to the top"
            className="flex items-center gap-2"
          >
            <div
              className="flex w-[clamp(15px,10%,45px)] items-center justify-center rounded-full"
              style={{ backgroundColor: currentColors?.logoBG }}
              aria-hidden="true"
            >
              <img src={Logo} alt="Vélo Fitness" className="h-auto w-[95%]" />
            </div>
            <figcaption
              aria-hidden="true"
              style={{
                color: currentColors?.color,
              }}
              className="text-lg font-bold"
            >
              Vélo Fitness
            </figcaption>
          </button>

          <nav className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {loggedInLinks.map((element) => (
                <li key={element.key} className="hover:underline">
                  <Link
                    to={`/${element.content.split(" ").join("").toLowerCase()}`}
                    style={{ color: currentColors?.color }}
                    className="block min-w-[9ch] text-center font-bold"
                    data-page={element.content}
                  >
                    {element.content}
                  </Link>
                </li>
              ))}
              <li>
                {!isLoggedIn && (
                  <Link
                    to="/jointoday"
                    style={{ color: currentColors?.color }}
                    className="flex min-w-[9ch] gap-1 rounded-md bg-[#AAFF00] px-8 py-4 text-center font-bold hover:bg-[#9EF200]"
                  >
                    <span>Join </span>
                    <span>Today</span>
                  </Link>
                )}
                {isLoggedIn && (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={toggleUserMenu}
                      className="flex items-center gap-3 rounded-full transition-all duration-200 hover:opacity-80 focus:ring-2 focus:ring-[#AAFF00] focus:ring-offset-2 focus:outline-none"
                      style={{ color: currentColors?.color }}
                      aria-label="User menu"
                    >
                      {/* User Avatar Circle with Initials */}
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#AAFF00] to-[#8BCC00] shadow-md">
                        <span className="text-sm font-bold text-gray-900">
                          {user?.avatarInitials || "U"}
                        </span>
                      </div>

                      {/* User Name - Hidden on small screens */}
                      <span className="hidden text-sm font-medium sm:inline-block">
                        {user?.name || user?.email?.split("@")[0] || "User"}
                      </span>

                      {/* Dropdown Arrow Icon */}
                      <svg
                        className={`hidden h-4 w-4 transition-transform duration-200 sm:block ${
                          showUserMenu ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {showUserMenu && (
                      <LoggedInModal setShowUserMenu={setShowUserMenu} />
                    )}
                  </div>
                )}
              </li>
            </ul>
          </nav>

          <button
            aria-label="Open drop down menu"
            onClick={handleOpeningSidebar}
            className="bg-transparent lg:hidden"
          >
            <Menu
              aria-hidden="true"
              style={{ color: currentColors?.btnBG }}
              className="min-w-6"
            />
          </button>
        </div>
      </header>

      <Sidebar
        UpdateSidebarVisibility={handleSidebarDisplay}
        sideBarStatus={showSidebar}
        lastFocusedElement={lastFocusedElement}
      />
    </>
  );
}
