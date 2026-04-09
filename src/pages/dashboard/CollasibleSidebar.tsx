import { useState, useEffect } from "react";
import { CreditCard, User } from "lucide-react";
import throttle from "lodash.throttle";

interface Props {
  activePage: string;
  onPageChange: (pageId: string) => void;
  onCollapseChange: (newCollapsedState: boolean) => void;
}

export default function CollapsibleSidebar({
  activePage,
  onPageChange,
  onCollapseChange,
}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "profile", label: "Profile", icon: <User /> },
    { id: "membership", label: "Membership", icon: <CreditCard /> },
  ];

  // Mobile view
  if (isMobile) {
    return (
      <>
        <button onClick={() => {}} />
        {isMobileMenuOpen && <div onClick={() => {}} />}
        <div>
          <div>
            <h2>Menu</h2>
            <div />
          </div>
          <nav>
            {navItems.map((item) => (
              <button key={item.id} onClick={() => {}}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {activePage === item.id && <span>✓</span>}
              </button>
            ))}
          </nav>
        </div>
      </>
    );
  }

  // Desktop view
  return (
    <div>
      <button onClick={() => {}}>{isCollapsed ? "→" : "←"}</button>

      <div>
        <div>
          {!isCollapsed ? (
            <>
              <h1>Vélo</h1>
              <div />
            </>
          ) : (
            <div>V</div>
          )}
        </div>

        <nav>
          {navItems.map((item) => (
            <button key={item.id} onClick={() => {}}>
              <span>{item.icon}</span>
              {!isCollapsed && (
                <>
                  <span>{item.label}</span>
                  {activePage === item.id && <div />}
                </>
              )}
            </button>
          ))}
        </nav>

        {!isCollapsed && (
          <div>
            <div>
              <div>Vélo Membership</div>
              <div>v1.0.0</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
