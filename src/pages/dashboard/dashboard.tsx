import { useState, useEffect } from "react";
import throttle from "lodash.throttle";
import CollapsibleSidebar from "./CollapsibleSidebar";
import ProfileOverview from "./profileoverview/ProfileOverview";
import MembershipHub from "./membershiphub/MembershipHub";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("profile");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();

    const throttledCheck = throttle(checkScreenSize, 150);

    window.addEventListener("resize", throttledCheck);

    return () => {
      throttledCheck.cancel();
      window.removeEventListener("resize", throttledCheck);
    };
  }, []);

  // Handle sidebar collapse state change (desktop only)
  const handleSidebarCollapse = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <div className="flex min-h-screen bg-black">
      <CollapsibleSidebar
        activePage={activePage}
        onPageChange={setActivePage}
        onCollapseChange={handleSidebarCollapse}
      />

      {/* Main Content - Margin only on desktop, full width on mobile */}
      <div
        className={`flex-1 transition-all duration-300 ${
          !isMobile && isSidebarCollapsed
            ? "ml-20"
            : !isMobile && !isSidebarCollapsed
              ? "ml-64"
              : "ml-0"
        }`}
      >
        {activePage === "profile" && <ProfileOverview />}
        {activePage === "membership" && <MembershipHub />}
      </div>
    </div>
  );
}
