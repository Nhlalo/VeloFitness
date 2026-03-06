import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useRouteHandle from "../../../hooks/useRouteHandle.tsx";
import { Menu } from "lucide-react";
import { navLinksContent } from "../../../data/constants/navigation.ts";
import handleScrollToTop from "../../../utils/scrollToTop.ts";
import Sidebar from "./Sidebar.tsx";

export default function Header({}) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const lastFocusedElement = useRef<HTMLElement>(null);

  const url = useLocation();

  const navigate = useNavigate();

  const colorScheme = useRouteHandle();

  const currentColors = isScrolled
    ? colorScheme?.scrolled
    : colorScheme?.default;

  useEffect(() => {
    const handleScroll = () => {
      const hasScrolled = window.pageYOffset > 0;
      setIsScrolled(hasScrolled);
    };

    // Use passive for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []); //

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

  return (
    <>
      {/* Placeholder pushes the content down, while the real header floats above it. */}
      <div className="h-16" aria-hidden="true"></div>
      <header
        style={{
          backgroundColor: currentColors?.bg,
          color: currentColors?.color,
        }}
        className="fixed top-0 z-1000 flex w-full justify-center py-3"
      >
        <div className="flex w-[95%] max-w-335 items-center justify-between">
          <button
            onClick={handleClick}
            aria-label="Scroll to the top"
            className="flex items-center gap-2"
          >
            <div
              className="w-[clamp(15px, 10%, 45px)] flex items-center justify-center rounded-full"
              style={{ backgroundColor: currentColors?.logoBG }}
              aria-hidden="true"
            >
              <img src="#" alt="Logo" className="h-auto w-[95%]" />
            </div>
            <figcaption
              aria-hidden="true"
              style={{
                color: currentColors?.color,
              }}
              className="text-lg font-bold"
            >
              Website Name
            </figcaption>
          </button>
          <nav className="hidden lg:block">
            <ul className="flex gap-10">
              {navLinksContent.map((element) => (
                <li
                  key={element.key}
                  className="cursor:pointer hover:underline"
                >
                  <Link
                    to="/"
                    style={{ color: currentColors?.color }}
                    className="block min-w-[9ch] text-center font-bold"
                  >
                    {element.content}
                  </Link>
                </li>
              ))}
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
