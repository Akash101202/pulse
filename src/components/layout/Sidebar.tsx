"use client";

import Link from "next/link";
import { Home, FileText, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar({ open }: { open: boolean }) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transition-transform duration-300",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="h-14 flex items-center px-4 border-b font-semibold">
        Pulse
      </div>

      <nav className="p-3 space-y-1">
        <NavItem href="/" icon={<Home size={18} />} label="Home" />
        <NavItem
          href="/resume/create/ai"
          icon={<FileText size={18} />}
          label="AI Resume"
        />
        <NavItem
          href="/jobs"
          icon={<Briefcase size={18} />}
          label="Jobs"
        />
      </nav>
    </aside>
  );
}

function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition"
    >
      {icon}
      {label}
    </Link>
  );
}
