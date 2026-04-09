import { useState, useEffect } from "react";
import { CreditCard, User } from "lucide-react";
import throttle from "lodash.throttle";

interface Props {
  activePage: string;
  onPageChange: (pageId: string) => void;
  onCollapseChange: (newCollapsedState: boolean) => void;
}

export default function CollapsibleSidebar() {
  return (
    <>
      {/* Mobile Menu Button */}
      <button className="fixed top-4 left-4 z-50 rounded-lg border border-white/20 bg-black/80 p-2 backdrop-blur-xl">
        <div className="flex h-5 w-6 flex-col justify-between">
          <span className="h-0.5 w-full rounded-full bg-white" />
          <span className="h-0.5 w-full rounded-full bg-white" />
          <span className="h-0.5 w-full rounded-full bg-white" />
        </div>
      </button>

      {/* Mobile Overlay */}
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />

      {/* Mobile Slide-out Menu */}
      <div className="fixed top-0 left-0 z-40 h-full w-64 transform border-r border-white/10 bg-black/95 backdrop-blur-xl transition-transform duration-300">
        <div className="p-6 pt-20">
          <div className="mb-8">
            <h2 className="text-2xl font-light">Menu</h2>
            <div className="mt-2 h-px bg-white/10" />
          </div>
          <nav className="space-y-2">
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all">
              <span className="text-xl" />
              <span />
            </button>
          </nav>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="fixed top-0 left-0 z-40 h-full border-r border-white/10 bg-black/95 backdrop-blur-xl transition-all duration-300">
        <button className="absolute top-8 -right-3 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xs text-white/60 transition-all duration-300 hover:scale-110 hover:text-white" />

        <div className="flex h-full flex-col">
          <div className="mb-8 p-6 pt-8">
            <h1 className="text-2xl font-light tracking-tight">Vélo</h1>
            <div className="mt-2 h-px bg-white/10" />
          </div>

          <nav className="flex-1 space-y-2 px-2">
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all">
              <span className="text-xl" />
              <span className="font-medium" />
            </button>
          </nav>

          <div className="border-t border-white/10 p-6">
            <div className="text-xs text-white/40">
              <div>Vélo Membership</div>
              <div className="mt-1">v1.0.0</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
