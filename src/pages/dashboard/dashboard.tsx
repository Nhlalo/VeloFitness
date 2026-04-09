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
    <div>
      <CollapsibleSidebar
        activePage={activePage}
        onPageChange={setActivePage}
        onCollapseChange={handleSidebarCollapse}
      />
      <div>
        {activePage === "profile" && <ProfileOverview />}
        {activePage === "membership" && <MembershipHub />}
      </div>
    </div>
  );
}
