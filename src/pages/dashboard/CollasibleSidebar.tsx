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

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const isNowMobile = window.innerWidth < 768;
      setIsMobile(isNowMobile);
      setIsMobileMenuOpen((prev) => (!isNowMobile ? false : prev));
    };

    checkScreenSize();

    const throttledCheck = throttle(checkScreenSize, 150);
    window.addEventListener("resize", throttledCheck);

    return () => {
      throttledCheck.cancel();
      window.removeEventListener("resize", throttledCheck);
    };
  }, []);

  // Notify parent when collapse state changes (desktop only)
  const handleToggleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (onCollapseChange) {
      onCollapseChange(newCollapsedState);
    }
  };

  const navItems = [
    {
      id: "profile",
      label: "Profile",
      icon: <User className="fill-fuchsia-950 text-fuchsia-950" />,
    },
    {
      id: "membership",
      label: "Membership",
      icon: <CreditCard className="fill-blue-600 text-black" />,
    },
  ];

  const handleNavigation = (pageId: string) => {
    onPageChange(pageId);
    setIsMobileMenuOpen(false);
  };

  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-4 left-4 z-50 rounded-lg border border-white/20 bg-black/80 p-2 backdrop-blur-xl"
        >
          <div className="flex h-5 w-6 flex-col justify-between">
            <span className="h-0.5 w-full rounded-full bg-white" />
            <span className="h-0.5 w-full rounded-full bg-white" />
            <span className="h-0.5 w-full rounded-full bg-white" />
          </div>
        </button>

        {/* Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Slide-out Menu - Overlay, doesn't reserve space */}
        <div
          className={`fixed top-0 left-0 z-40 h-full w-64 transform border-r border-white/10 bg-black/95 backdrop-blur-xl transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 pt-20">
            <div className="mb-8">
              <h2 className="text-2xl font-light">Menu</h2>
              <div className="mt-2 h-px bg-white/10" />
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                    activePage === item.id
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                  {activePage === item.id && (
                    <span className="ml-auto text-white/40">✓</span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </>
    );
  }

  // Desktop: Collapsible Sidebar - Reserves space
  return (
    <div
      className={`fixed top-0 left-0 z-40 h-full border-r border-white/10 bg-black/95 backdrop-blur-xl transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <button
        onClick={handleToggleCollapse}
        className="absolute top-8 -right-3 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xs text-white/60 transition-all duration-300 hover:scale-110 hover:text-white"
      >
        {isCollapsed ? "→" : "←"}
      </button>

      <div className="flex h-full flex-col">
        <div className={`mb-8 p-6 pt-8 ${isCollapsed ? "px-2" : ""}`}>
          {!isCollapsed ? (
            <>
              <h1 className="text-2xl font-light tracking-tight">Vélo</h1>
              <div className="mt-2 h-px bg-white/10" />
            </>
          ) : (
            <div className="text-center text-xl font-light">V</div>
          )}
        </div>

        <nav className="flex-1 space-y-2 px-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                activePage === item.id
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              } ${isCollapsed ? "justify-center" : ""}`}
            >
              <span className="text-xl">{item.icon}</span>
              {!isCollapsed && (
                <>
                  <span className="font-medium">{item.label}</span>
                  {activePage === item.id && (
                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {!isCollapsed && (
          <div className="border-t border-white/10 p-6">
            <div className="text-xs text-white/40">
              <div>Vélo Membership</div>
              <div className="mt-1">v1.0.0</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
