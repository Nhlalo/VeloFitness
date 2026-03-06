import { useRef, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router";
import { X } from "lucide-react";
import useFocusTrap from "../../../hooks/useFocusTrap";
import NavLinksContentRef from "../../../data/constants/navigation";
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
  const sidebarRef = useRef(null);
  const logoLinkRef = useRef(null);
  const closeSideBarBTNRef = useRef(null);
  const concertsLinkRef = useRef(null);
  const chartsLinkRef = useRef(null);
  const myMusicLinkRef = useRef(null);
  const contactsLinkRef = useRef(null);

  const navigate = useNavigate();
  const url = useLocation();

  //Reference all the elements that are focusable, essential in trapping focus within sidebar
  const refs = [
    logoLinkRef,
    closeSideBarBTNRef,
    concertsLinkRef,
    chartsLinkRef,
    myMusicLinkRef,
    contactsLinkRef,
  ].map((ref) => ref?.current);

  //Links are generated through mapping, therefore the reference (ref) must be dynamically. This function aids in that.
  const navLinksContent = NavLinksContentRef(
    concertsLinkRef,
    chartsLinkRef,
    myMusicLinkRef,
    contactsLinkRef,
  );

  //Close the sidebar when navigating to a new page
  useEffect(() => {
    if (sideBarStatus) {
      UpdateSidebarVisibility(false);
    }
  }, [url]);

  //Trap focus within the sidebar
  useFocusTrap(logoLinkRef.current, closeSideBar, refs, sideBarStatus);

  //Close the side bar
  function closeSideBar() {
    const elementToRestore: HTMLElement | null = lastFocusedElement.current;
    UpdateSidebarVisibility(false);

    //Ensures that the element is refocused after the state update
    requestAnimationFrame(() => {
      elementToRestore?.focus();
    });
  }
  function handleHomePage() {
    navigate("/");
  }
  const sidebarStyling =
    "flex justify-center w-screen h-screen m-0 p-0 rounded-none bg-black text-white fixed top-0 right-0 z-[1001] max-h-none max-w-none border-none transform transition-transform duration-300 ease-out [&::backdrop]:bg-black/50 [&::backdrop]:backdrop-blur-sm [&::backdrop]:animate-[fadeIn_0.3s_ease]";

  return (
    <dialog
      ref={sidebarRef}
      className={`${sidebarStyling} ${sideBarStatus ? "translate-x-0" : "translate-x-full"}`}
    >
      <Container>
        <div className="flex w-full max-w-335 flex-col pt-4">
          <div className="flex justify-between">
            <button
              ref={logoLinkRef}
              aria-label="Home page"
              onClick={handleHomePage}
              className="flex cursor-pointer items-center gap-2"
              tabIndex={sideBarStatus ? 0 : -1}
            >
              <div
                aria-hidden="true"
                className="w-[clamp(15px, 10%, 45px)] flex items-center justify-center rounded-full bg-[#636366]"
              >
                <img src="#" alt="Website" className="h-auto w-[95%]" />
              </div>
              <figcaption
                aria-hidden="true"
                className="text-5 font-bold text-white"
              >
                Website Name
              </figcaption>
            </button>
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
              {navLinksContent.map((navLinkContent) => (
                <li
                  key={navLinkContent.key}
                  className="py-6 pr-0 pl-14 hover:underline"
                >
                  <Link
                    to="/"
                    ref={navLinkContent.ref}
                    className="text-5 text-white focus:text-gray-500"
                    tabIndex={sideBarStatus ? 0 : -1}
                  >
                    {navLinkContent.content}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </dialog>
  );
}
