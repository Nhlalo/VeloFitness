import { useState, useEffect } from "react";
import throttle from "lodash.throttle";
import CollapsibleSidebar from "./CollasibleSidebar";
import ProfileOverview from "./profileoverview/ProfileOverview";
import MembershipHub from "./membershiphub/MembershipHub";

export default function CompleteDashboard() {
  const [activePage, setActivePage] = useState("profile");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
      <div className="ml-0 flex-1 transition-all duration-300">
        {activePage === "profile" && <ProfileOverview />}
        {activePage === "membership" && <MembershipHub />}
      </div>
    </div>
  );
}
