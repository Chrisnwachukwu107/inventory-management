"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import SideBar from "./sidebar";

export default function DashboardLayout({
  children,
  currentPath,
}: {
  children: React.ReactNode;
  currentPath: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-full bg-gray-50 flex ">
      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 w-64 z-40
          bg-white border-r border-gray-200
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <SideBar currentPath={currentPath} />
      </div>

      {/* Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 w-full overflow-x-hidden">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between lg:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {open ? <X /> : <Menu />}
          </button>
        </header>

        <main className="p-2 sm:p-6 lg:p-8 w-full">{children}</main>
      </div>
    </div>
  );
}
