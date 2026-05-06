import { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { X } from "lucide-react";
import { useAuth } from "../../../context/authContext.tsx";
import useFocusTrap from "../../../hooks/useFocusTrap";
import NavLinksContentRef from "../../../data/constants/navigation";
import generateInitials from "../../../utils/generateInitials.ts";
import Container from "../../shared/Container";

//UpdateSidebarVisibility(function)- change the state, in the parent component, of whether the side bar should be closed or not
//sideBarStatus(boolean) - the value that determines if the side bar should be displayed or not
interface Props {
  UpdateSidebarVisibility: (value: boolean) => void;
  sideBarStatus: boolean;
  lastFocusedElement: {
    current: HTMLElement | null;
  };
}
export default function Sidebar({
  UpdateSidebarVisibility,
  sideBarStatus,
  lastFocusedElement,
}: Props) {
  const sidebarRef = useRef<HTMLDialogElement>(null);
  const closeSideBarBTNRef = useRef(null);
  const clubsRef = useRef(null);
  const membershipRef = useRef(null);
  const classesRef = useRef(null);
  const signInRef = useRef(null);
  const profileRef = useRef(null);
  const membershipInfoRef = useRef(null);
  const signOutRef = useRef(null);

  const url = useLocation();

  const { user, isLoggedIn } = useAuth();

  const userInitials = generateInitials(
    user?.name as string,
    user?.surname as string,
  );

  //Reference all the elements that are focusable, essential in trapping focus within sidebar
  const refs = [
    closeSideBarBTNRef,
    clubsRef,
    membershipRef,
    classesRef,
    signInRef,
    profileRef,
    membershipInfoRef,
    signOutRef,
  ].map((ref) => ref?.current);

  //Links are generated through mapping, therefore the reference (ref) must be dynamically. This function aids in that.
  const navLinksContent = NavLinksContentRef(
    clubsRef,
    membershipRef,
    classesRef,
    signInRef,
  );

  const loggedInLinks = isLoggedIn
    ? navLinksContent.filter((link) => link.content.toLowerCase() != "sign in")
    : navLinksContent;

  // Handle scroll lock when sidebar is open
  useEffect(() => {
    if (sideBarStatus) {
      // Save current scroll position
      const scrollY = window.scrollY;

      // Add styles to prevent background scroll
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      // For dialog element, prevent background interaction
      if (sidebarRef.current) {
        sidebarRef.current.style.overflowY = "auto";
        sidebarRef.current.style.maxHeight = "100vh";
      }
    } else {
      // Restore scroll position when sidebar closes
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [sideBarStatus]);

  //Close the sidebar when navigating to a new page
  useEffect(() => {
    if (sideBarStatus) {
      UpdateSidebarVisibility(false);
    }
  }, [url]);

  //Trap focus within the sidebar
  useFocusTrap(clubsRef.current, closeSideBar, refs, sideBarStatus, isLoggedIn);

  //Close the side bar
  function closeSideBar() {
    const elementToRestore: HTMLElement | null = lastFocusedElement.current;
    UpdateSidebarVisibility(false);

    //Ensures that the element is refocused after the state update
    requestAnimationFrame(() => {
      elementToRestore?.focus();
    });
  }

  const sidebarStyling =
    "flex justify-center w-screen h-screen m-0 p-0 rounded-none bg-black text-white fixed top-0 right-0 z-[1001] max-h-none max-w-none border-none transform transition-transform duration-300 ease-out overflow-y-auto";

  return (
    <dialog
      ref={sidebarRef}
      className={`${sidebarStyling} ${sideBarStatus ? "translate-x-0" : "translate-x-full"}`}
      onClick={(e) => {
        // Close when clicking on backdrop
        if (e.target === e.currentTarget) {
          closeSideBar();
        }
      }}
    >
      <Container>
        <div className="flex w-full max-w-335 flex-col pt-4">
          <div className="flex justify-between">
            {isLoggedIn && (
              <div className="mt-8 py-6">
                <div className="flex items-center gap-4 px-14">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#AAFF00]">
                    <span className="text-base font-bold text-black">
                      {userInitials}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">
                      {user?.name}
                    </span>
                    <span className="text-xs text-gray-400">{user?.email}</span>
                  </div>
                </div>
              </div>
            )}
            <button
              aria-label="Close the side bar"
              onClick={closeSideBar}
              ref={closeSideBarBTNRef}
              tabIndex={sideBarStatus ? 0 : -1}
            >
              <X aria-hidden="true" className="min-w-6 text-white" />
            </button>
          </div>

          <nav className="px-0 pt-12 pb-0">
            <ul className="p-0">
              {loggedInLinks.map((navLinkContent) => (
                <li
                  key={navLinkContent.key}
                  className="py-6 pr-0 pl-14 hover:underline"
                >
                  <Link
                    to={`/${navLinkContent.content.split(" ").join("").toLowerCase()}`}
                    ref={navLinkContent.ref}
                    className="text-5 text-white focus:text-gray-500"
                    tabIndex={sideBarStatus ? 0 : -1}
                  >
                    {navLinkContent.content}
                  </Link>
                </li>
              ))}

              {isLoggedIn && (
                <>
                  {/* Divider */}
                  <li className="my-4 px-14">
                    <hr className="border-gray-700" />
                  </li>

                  <li className="py-6 pr-0 pl-14 hover:underline">
                    <Link
                      to="/profile"
                      ref={profileRef}
                      className="text-5 text-white focus:text-gray-500"
                      tabIndex={sideBarStatus ? 0 : -1}
                    >
                      Profile
                    </Link>
                  </li>

                  <li className="py-6 pr-0 pl-14 hover:underline">
                    <Link
                      to="/mymembership"
                      ref={membershipInfoRef}
                      className="text-5 text-white focus:text-gray-500"
                      tabIndex={sideBarStatus ? 0 : -1}
                    >
                      Membership
                    </Link>
                  </li>

                  <li className="py-6 pr-0 pl-14 hover:underline">
                    <button
                      ref={signOutRef}
                      onClick={closeSideBar}
                      className="text-5 text-white focus:text-gray-500"
                      tabIndex={sideBarStatus ? 0 : -1}
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </Container>
    </dialog>
  );
}
