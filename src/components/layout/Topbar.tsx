"use client";

import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  sidebarOpen: boolean;
  onToggle: () => void;
};

export default function Topbar({ sidebarOpen, onToggle }: Props) {
  return (
    <header className="h-14 flex items-center gap-4 px-4 border-b bg-background">
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? (
          <PanelLeftClose size={20} />
        ) : (
          <PanelLeftOpen size={20} />
        )}
      </Button>

      <h1 className="text-base font-medium text-muted-foreground">
        Pulse
      </h1>
    </header>
  );
}
