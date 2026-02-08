"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { cn } from "@/lib/utils";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar open={sidebarOpen} />

      <div
        className={cn(
          "transition-all duration-300",
          sidebarOpen ? "md:ml-64" : "ml-0"
        )}
      >
        <Topbar
          sidebarOpen={sidebarOpen}
          onToggle={() => setSidebarOpen((o) => !o)}
        />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
